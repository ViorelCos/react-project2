import React from 'react';
import Graph from '../graphs/Graph';
import { Popcodes } from '../../domain/popcodes';
import * as lodash from 'lodash';

class PopcodeOperationsGraph extends React.Component {
  constructor(props) {
    super(props);
    // TODO: reset this state when needed
    this._nodeStatsByIds = {};
  }

  render() {
    const popcode = this._getPopcode();

    return (
      <div>
        {popcode.popcodeName}
        <Graph
          initialData={_getStepsGraph(popcode)}
          useArrows={true}
          onNodeClick={this._onNodeClick}
          exposeGraphHandle={graphHandle => (this._graphHandle = graphHandle)}
        />
      </div>
    );
  }

  _getPopcode() {
    return Popcodes.getById(this.props.popcodeId);
  }

  _onNodeClick = nodeId => {
    const isStepNode = _isStep(this._getPopcode(), nodeId);

    if (isStepNode) {
      const operationsGraph = _getStepOperationsGraph(
        this._getPopcode(),
        nodeId
      );
      const isExpanded = this._toggleExpanded(nodeId);

      isExpanded
        ? this._graphHandle.addNodesAndEdges(operationsGraph)
        : this._graphHandle.deleteNodesAndEdges(operationsGraph);
    }
  };

  _toggleExpanded(nodeId) {
    const toggledExpanded = !this._getNodeStateById(nodeId).isExpanded;

    this._updateNodeState(nodeId, { isExpanded: toggledExpanded });

    return toggledExpanded;
  }
  _getNodeStateById(nodeId) {
    return (
      this._nodeStatsByIds[nodeId] || {
        isExpanded: false
      }
    );
  }

  _updateNodeState(nodeId, stateUpdate) {
    this._nodeStatsByIds[nodeId] = Object.assign(
      this._getNodeStateById(nodeId),
      stateUpdate
    );
  }
}

export { PopcodeOperationsGraph };

function _isStep(popcode, id) {
  return _getSteps(popcode).find(step => step.id === id);
}

const getDateTimeFromEpoch = epoch => {
  let iEpoch = parseInt(epoch.substr(0, 10), 10);
  let nDate = new Date(0);
  nDate.setUTCSeconds(iEpoch);
  return nDate;
};

function camelCaseToWords(str) {
  return str
    .match(/^[a-z]+|[A-Z][a-z]*/g)
    .map(function(x) {
      return x[0].toUpperCase() + x.substr(1).toLowerCase();
    })
    .join(' ');
}

function _getStepsGraph(popcode) {
  const nodes = _getSteps(popcode).map(step => {
    let displayName = camelCaseToWords(step.name);
    return {
      id: step.id,
      label: displayName,
      shape: STEP_NODE_SHAPE
    };
  });

  const edges = [];

  nodes.forEach((node, index) => {
    if (index > 0) {
      const previousNode = nodes[index - 1];
      edges.push({
        from: previousNode.id,
        to: node.id
      });
    }
  });

  return { nodes, edges };
}

function _getSteps(popcode) {
  const steps = [];

  // transactions are ordered, so chenge of transactions' step id means that the current step is finished
  _iteratePopcodeTransactions(popcode, transaction => {
    const stepId = _getStepId(transaction);

    const lastStep = steps.length > 0 ? steps[steps.length - 1] : null;

    const nextStepReached = !lastStep || lastStep.id !== stepId;

    if (nextStepReached) {
      steps.push({
        id: stepId,
        // TODO: use workflow definition here to get the displayed step name
        name: stepId
      });
    }
  });

  return steps;
}

function _getStepOperationsGraph(popcode, stepId) {
  const nodes = [];

  _iteratePopcodeTransactions(popcode, function(transaction) {
    if (_getStepId(transaction) === stepId) {
      nodes.push(_createOperationNode(popcode, transaction));
    }
  });

  const edges = nodes.map((node, index) => {
    // start chain of transactions from the step itself
    return {
      to: node.id,
      from: index === 0 ? stepId : nodes[index - 1].id
    };
  });

  // also link the last transacttion to the step node to create a fancy loop
  edges.push({
    from: nodes[nodes.length - 1].id,
    to: stepId
  });

  return { nodes, edges };
}

function _getStepId(transaction) {
  const stepIdPath = 'data.metadata.appData.spot';

  const stepId = lodash.get(transaction, stepIdPath);

  if (!stepId) {
    throw new Error(
      `Step id not set in transaction '${
        transaction.id
      }' in path '${stepIdPath}'. transaction:\n${JSON.stringify(
        transaction,
        null,
        2
      )}`
    );
  }

  return stepId;
}

function _iteratePopcodeTransactions(popcode, iteratee) {
  return popcode.transaction.map(iteratee);
}

function _createOperationNode(popcode, t) {
  let label;
  let title = '';
  let shape;
  let nDate = getDateTimeFromEpoch(t.date);
  let displayDate = nDate.toString();

  // copied from https://bitbucket.org/skuchaindev/cayley/src/1f8e76c50fcde87d5d1054d8ff94c5e52ba32163/srv/public/js/visMain.js?at=tabularasa&fileviewer=file-view-default#visMain.js-107
  if (t.operation === 'mint') {
    shape = 'circle';
    label = 'Popcode';
    title = '<b>Blockchain Op:</b> mint';
    title += `<br><b>Popcode Name:</b> ${popcode.popcodeName}`;
    title += `<br><b>Address:</b> ${t.address}`;
    title += `<br><b>Amount:</b> ${t.amount}`;
    title += `<br><b>Unit:</b> ${t.unit}`;
    title += `<br><b>Blockchain TX Id:</b> ${t.txId}`;
    title += `<br><b>Timestamp:</b> ${displayDate}`;
  } else if (t.operation === 'blobCreate') {
    let displayAction = camelCaseToWords(t.data.metadata.appData.spot);
    shape = 'box';
    const extractedLabel = _extractNodeLabel(t, 'data.metadata.appData.spot');

    label = extractedLabel.label;
    title = '<b>Blockchain Op:</b> note event';
    title += `<br><b>Popcode Name:</b> ${popcode.popcodeName}`;
    title += `<br><b>Address:</b> ${t.address}`;
    title += `<br><b>Workflow Action:</b> ${displayAction}`;
    title += `<br><b>Blockchain TX Id:</b> ${t.txId}`;
    title += `<br><b>Timestamp:</b> ${displayDate}`;

    if (extractedLabel.warning) {
      title += `<br><b>WARNING:</b> ${extractedLabel.warning}`;
    }

    if (t.stateActionName === 'createShippingBox') {
      const p = Popcodes.findByAddress(t.address);
      const t2 = p.transaction.find(o => o.operation === 'mint');

      shape = 'circle';
      label = 'Mint';
      title = '<b>Blockchain Op:</b> mint';
      title += `<br><b>Popcode Name:</b> ${p.popcodeName}`;
      title += `<br><b>Address:</b> ${t2.address}`;
      title += `<br><b>Amount:</b> ${t2.amount}`;
      title += `<br><b>Unit:</b> ${t2.unit}`;
      title += `<br><b>Blockchain TX Id:</b> ${t2.txId}`;
      title += `<br><b>Timestamp:</b> ${t2.date}`;
    } else if (t.stateActionName === 'addBox') {
      const p = Popcodes.findByAddress(t.bomAddress);
      const t2 = p.transaction.find(o => o.operation === 'mint');

      shape = 'circle';
      label = 'Mint';
      title = '<b>Blockchain Op:</b> mint';
      title += `<br><b>Popcode Name:</b> ${p.popcodeName}`;
      title += `<br><b>Address:</b> ${t2.address}`;
      title += `<br><b>Amount:</b> ${t2.amount}`;
      title += `<br><b>Unit:</b> ${t2.unit}`;
      title += `<br><b>Blockchain TX Id:</b> ${t2.txId}`;
      title += `<br><b>Timestamp:</b> ${t2.date}`;
    }
  } else if (t.operation === 'bomUpdate') {
    const p = Popcodes.findByAddress(t.bomAddress);
    shape = 'circle';
    label = t.bomOp === 'in' ? 'BOM IN' : 'BOM OUT';
    title = '<b>Blockchain Op:</b> bomUpdate';
    title += `<br><b>BOM Op:</b> ${t.bomOp}`;
    title += `<br><b>Popcode Name:</b> ${popcode.popcodeName}`;
    title += `<br><b>Address:</b> ${t.address}`;
    title += `<br><b>BOM Popcode Name:</b> ${p.popcodeName}`;
    title += `<br><b>BOM Address:</b> ${t.bomAddress}`;
    title += `<br><b>Blockchain TX Id:</b> ${t.txId}`;
    title += `<br><b>Timestamp:</b> ${displayDate}`;
  }

  return {
    id: t.id,
    label,
    title,
    shape
  };
}

function _extractNodeLabel(transaction, pathToLabel) {
  let warning;
  let label = lodash.get(transaction, pathToLabel);

  if (lodash.isNil(label)) {
    label = transaction.operation;
    warning = `Value for label not found in path: '${pathToLabel}'`;
    console.warn(warning);
  }

  return { label, warning };
}

const STEP_NODE_SHAPE = 'dot';

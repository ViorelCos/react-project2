import React from 'react';

import { Table } from 'antd';
import { Link } from 'react-router-dom';

import { Popcodes } from '../../domain/popcodes';

import _ from 'lodash';

var getVisualizations = function(popcode) {
  
  const workflowName = _.has(popcode,'appData.workflowName') ? popcode.appData.workflowName : null;
  if(_.isNil(workflowName))
    return null;
    
  var visualizations;
  if(!_.isNil(popcode.visualizations)) {
    visualizations = popcode.visualizations;
  }
  else {
    if(_.startsWith(workflowName,'wine')) {
      visualizations = [
        {
          name: 'popcodeTimeline',
          title: 'Timeline'
        },
        {
          name: 'wineWorkflow',
          title: 'Wine Workflow'
        },
        {
          name: 'wine-cytoscope',
          title: 'Wine Workflow Cytoscape'
        }
      ]
    }
    else if(_.startsWith(workflowName,'ntt')) {
      visualizations = [
        {
          name: 'popcodeTimeline',
          title: 'Timeline'
        },
        {
          name: 'nttdWorkflow',
          title: 'NTTD Workflow'
        }
      ]
    }
    else if(_.startsWith(workflowName,'siemens')) {
      visualizations = [
        {
          name: 'popcodeTimeline',
          title: 'Timeline'
        },
        {
          name: 'siemensWorkflow',
          title: 'Siemens Workflow'
        }
      ]
    }
  }
  return visualizations;
}

var renderVisLinks = function(record) {
  
  var visualizations = getVisualizations(record);
  if(_.isNil(visualizations))
    return null;
  
  const returnValue = visualizations.map((o, index) => {
    if(index > 0)
      return (
        <span key={index}>&nbsp;|&nbsp;<Link to={`/${o.name}/${record.id}`}>{o.title}</Link></span>
      );
    else
      return (
        <span key={index}><Link to={`/${o.name}/${record.id}`}>{o.title}</Link></span>
        );
  });
  return returnValue;
}

const columns = [
  {
    title: 'Name',
    dataIndex: 'popcodeName',
    key: 'popcodeName',
    render: (text, record) => {
      console.log({record});
      return (
      <div>
        <span>{record.popcodeName}:&nbsp;</span>
        {renderVisLinks(record)}
      </div>
    )
      /*
      return (
      <div>
        <span>{record.popcodeName}:&nbsp;</span>
        <Link to={`/popcodeTimeline/${record.id}`}>Timeline</Link>
        &nbsp;|&nbsp;
        <Link to={`/popcodeOperations/${record.id}`}>Operations</Link>
        &nbsp;|&nbsp;
        <Link to={`/popcodeRelations/${record.id}`}>Related popcodes</Link>
          &nbsp;|&nbsp;
        <Link to={`/wine-vis/${record.id}`}>Wine vis</Link>
          &nbsp;|&nbsp;
        <Link to={`/wine-cytoscape/${record.id}`}>Wine cytoscope</Link>
      </div>
    )
    */
   }
  },
  {
    title: 'State',
    dataIndex: 'state',
    key: 'state'
  },
  {
    title: 'Last update',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    render: text => text ? getDateTimeFromEpoch(text.toString()).toLocaleString() : ''
  }
];

const getDateTimeFromEpoch = epoch => {
  let iEpoch = parseInt(epoch.substr(0, 10), 10);
  let nDate = new Date(0);
  nDate.setUTCSeconds(iEpoch);
  return nDate;
};

const getDataSource = Popcodes => {
  return Popcodes.map(Popcode => ({
    ...Popcode,
    key: Popcode.popcodeName,
    state: Popcode.spot,
    updatedAt: Popcode.timestamp
  }));
};

class PopcodeTable extends React.Component {
  render() {
    const dataSource = getDataSource(Popcodes.getAllPopcodesList());

    return (
      <div>
        <h3>All Popcodes</h3>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 10 }}
        />
      </div>
    );
  }
}

export default PopcodeTable;

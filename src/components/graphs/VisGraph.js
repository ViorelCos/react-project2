import vis from 'vis';
import 'vis/dist/vis-network.min.css';
import * as lodash from "lodash";

function createGraph (graphOptions) {
  return new VisGraph(graphOptions);
}

export {createGraph}

class VisGraph {
  constructor (graphOptions) {
    // the graph is changed by direct modification of these data sets, so we store references to them for future use
    this._nodes = new vis.DataSet();
    this._edges = new vis.DataSet();

    this._selectedNodeId = graphOptions.selectedNodeId
    this._network = new vis.Network(graphOptions.containerElement, { nodes: this._nodes, edges: this._edges}, _getNetworkOptions(graphOptions));

    this._subscribeToNetworkEvents(graphOptions);

    this.addNodesAndEdges(graphOptions.initialData)
  }

  _subscribeToNetworkEvents(graphOptions) {
    const onNodeClick = graphOptions.onNodeClick
    this._network.on('click', (clickEvent) => {
      const clickedNode = this._nodes.get(clickEvent.nodes)[0]

      if (clickedNode && onNodeClick) {
        onNodeClick(clickedNode.id)
      }
    });
  }

  addNodesAndEdges({nodes = [], edges = []}) {
    //add all nodes at once for now
    nodes.forEach((nodeData) => {
      const isSelected = this._selectedNodeId && nodeData.id === this._selectedNodeId;
      const specialStyle = isSelected && SPECIAL_STYLES.SELECTED;
      this._addNodeItself(nodeData, specialStyle);
    });

    //add edges only after all the nodes are added
    this._edges.add(edges.map((edge) => {
      return {
        from: edge.from,
        to: edge.to,
        color: BASE_EDGE_COLOR,
        selectionWidth: 2,
        hoverWidth: 0,
      }
    }))
  }

  deleteNodesAndEdges({nodes = [], edges = []}) {
    this._nodes.remove(nodes)

    edges.map(({from, to}) => this._edges.remove(this._getEdge({from, to})))
  }

  _addNodeItself(nodeData, nodeStyle) {
    const newNode = Object.assign({
      ...nodeData,
      label: _wrapLongNodeLabel(nodeData.label, 15),
      color: nodeData.color ? nodeData.color : BASE_NODE_COLOR,
    }, nodeStyle);
    if (nodeData.image) {
      newNode.image = nodeData.image;
    }

    this._nodes.add(newNode);
  }

  _edgeExists (from, to) {
    return this._getEdge({from, to})
  }

  _getEdge ({from, to}) {
    //we expect to have only one such edge
    const singleEdgeArray = this._edges.get({
      filter: function (edge) {
        return edge.from === from && edge.to === to;
      }
    });

    return singleEdgeArray[0];
  }

  _nodeExists(nodeId) {
    return !!this._nodes.get(nodeId);
  }
}

function _getNetworkOptions (graphOptions) {
  const useArrows = lodash.get(graphOptions, 'useArrows', false)

  return {
    height: '600px',
    nodes: {
      scaling: {
        min: 20, max: 20,
        label: { min: 14, max: 30, drawThreshold: 9, maxVisible: 20 }
      },
      font: { size: 14, face: 'Helvetica Neue, Helvetica, Arial' }
    },

    edges: {
      arrows: {
        to: useArrows
      }
    },
    interaction: {
      hover: true,
      hoverConnectedEdges: false,
      selectConnectedEdges: true,
    },
  };
}

// Break a sentence into separate lines, trying to fit each line within `limit`
// characters. Only break at spaces, never break in the middle of words.
function _wrapLongNodeLabel (label, limit) {
  var words = label.split(" ");
  var lines = [""];
  for (var i = 0; i < words.length; i++) {
    var word = words[i];
    const lastLine = lines[lines.length - 1];
    if (lastLine.length + word.length > limit) {
      lines.push(word);
    } else {
      lines[lines.length - 1] = lastLine + " " + word;
    }
  }
  return lines.join("\n").trim(); // Trim because the first line will start with a space
}


const BASE_NODE_COLOR = "#03A9F4";
const BASE_EDGE_COLOR = vis.util.parseColor(BASE_NODE_COLOR).border;

const SPECIAL_STYLES = {
  SELECTED: {
    color: "#FFC107"
  }
};

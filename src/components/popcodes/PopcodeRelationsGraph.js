import React from 'react';
import Graph from '../graphs/Graph';
import { Popcodes } from "../../domain/popcodes";

class PopcodeRelationsGraph extends React.Component {
  render () {
    const selectedPopcodeId = this.props.popcodeId;
    const selectedPopcode = Popcodes.getById(selectedPopcodeId);
    const reachablePopcodes = Popcodes.getAllReachablePopcodes(selectedPopcodeId);

    const graphData = _convertPopcodesToGraph(reachablePopcodes);

    return <Graph
      initialData={graphData}
      selectedNodeId={selectedPopcodeId}
      useArrows={true}
      title={`Related popcodes for '${selectedPopcode.popcodeName}'`}
    />
  }
}

function _convertPopcodesToGraph (popcodesByIds) {
  const outgoingEdgesByNodeIds = {}
  const edges = []
  const nodes = []

  Object.values(popcodesByIds).forEach(popcodeInfo => {
    const popcodeId = popcodeInfo.id;

    nodes.push({
      id: popcodeId,
      label: popcodeInfo.popcodeName,
      shape: 'dot'
    })

    Popcodes.getReferencedPopcodes(popcodeId).forEach((neighborId) => addEdge({
      from: popcodeId,
      to: neighborId
    }))

    Popcodes.getReferencingPopcodes(popcodeId).forEach((neighborId) => addEdge({
      from: neighborId,
      to: popcodeId
    }))
  });

  return {nodes, edges};

  function addEdge ({ from, to }) {
    if (!outgoingEdgesByNodeIds[from]) {
      outgoingEdgesByNodeIds[from] = {}
    }

    const existingDestinations = outgoingEdgesByNodeIds[from]

    if (!existingDestinations[to]) {
      existingDestinations[to] = true
      edges.push({ from, to })
    }
  }
};

export {PopcodeRelationsGraph}

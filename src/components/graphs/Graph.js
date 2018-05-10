import React from 'react';
import { createGraph } from "./VisGraph";

import './Graph.css';

export default class Graph extends React.Component {
  render () {
    return <div>
      <h2 className="graph-title">
        {this.props.title}
      </h2>
      <div ref={(containerElement) => this._containerElement = containerElement}></div>
    </div>;
  }

  componentDidMount () {
    const graph = createGraph({
      containerElement: this._containerElement,
      initialData: this.props.initialData,
      useArrows: this.props.useArrows,
      selectedNodeId: this.props.selectedNodeId,
      onNodeClick: this.props.onNodeClick,
    });

    if (this.props.exposeGraphHandle) {
      this.props.exposeGraphHandle(graph)
    }
  }
}

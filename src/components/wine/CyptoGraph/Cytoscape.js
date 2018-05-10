import React, {Component} from 'react';
import {ReactCytoscape} from 'react-cytoscape';

class CytoscapeGraph extends Component {

    render() {

        return (

            <ReactCytoscape containerID="cy"
                            elements={this.wineGraph()}
                            cyRef={(cy) => {
                                this.cyRef(cy)
                            }}
                            cytoscapeOptions={{wheelSensitivity: 0.1}}
                            layout={{name: 'preset',
                                padding: 10
                            }}
                            />
        );
    }

    cyRef(cy) {
        cy.on('tap', 'node', function (evt) {
            var node = evt.target;
            console.log(node);
        });
        window.cy1 = cy;
    }

    wineGraph() {

        const style = {
            'background-color': '#47a9f4',
            'font-size': '5px',
        }

        const edgeStyle = {
            "width": 1,
            "line-color": "#9dbaea",
        }

        let nodes = [{
            data: {id: 'truck'},
            classes: '.bluecircle',
            selected: false,
            selectable: true,
            locked: false,
            position: {x: 0, y: 0},
            style: style,
            group: 'nodes',
        },
            {
                data: {id: 'winemaker1'},
                classes: '.bluecircle',
                selected: false,
                selectable: true,
                locked: false,
                position: {x: 0, y: -50},
                group: 'nodes',
                style: style,
            },
            {
                data: {id: 'winemaker2'},
                classes: '.bluecircle',
                selected: false,
                selectable: true,
                locked: false,
                position: {x: 0, y: 50},
                group: 'nodes',
                style: style,
            },
            {
                data: {id: 'winemaker3'},
                classes: '.bluecircle',
                selected: false,
                selectable: true,
                locked: false,
                position: {x: 100, y: 10},
                group: 'nodes',
                style: style,
            },
            {
                data: {id: 'truck1'},
                style: {'background-image': 'https://farm4.staticflickr.com/3063/2751740612_af11fb090b_b.jpg', 'background-size': 'cover', ...style},
                classes: '.bluecircle',
                selected: false,
                selectable: true,
                locked: false,
                position: {x: -190, y: 10},
                group: 'nodes',
            },
           ];
        let edges = [
            {data: {source: 'truck', target: 'winemaker1'}, style:{...edgeStyle}},
            {data: {source: 'truck', target: 'winemaker2'}, style:{...edgeStyle}},
            {data: {source: 'truck', target: 'winemaker3'}, style:{...edgeStyle}},
            {data: {source: 'truck1', target: 'truck'}, style:{...edgeStyle}}
        ]


        return {nodes, edges}
    }
}

export {CytoscapeGraph};
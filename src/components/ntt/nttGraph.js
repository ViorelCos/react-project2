import React from 'react';
import Graph from '../graphs/Graph';
import cayley from '../../api/cayley';
import _ from 'lodash';

function camelCaseToWords(str) {
    return str
        .match(/^[a-z]+|[A-Z][a-z]*/g)
        .map(function(x) {
            return x[0].toUpperCase() + x.substr(1).toLowerCase();
        })
        .join(' ');
}

class NttGraph extends React.Component {
    constructor(props) {
        super(props);
        console.log('construct WineGraph');
        // TODO: reset this state when needed
        this._nodeStatsByIds = {};
        this.allPopcodes = [];

        this.haveData = false;
        this.isLoading = false;
    }

    render() {
        if(this.haveData) {
            return (
                <div>
                    <Graph
                        initialData={this.graphData}
                        useArrows={false}
                        selectedNodeId={this.selectedNodeId}
                        onNodeClick={this._onNodeClick}
                        exposeGraphHandle={graphHandle => (this._graphHandle = graphHandle)}
                    />
                </div>
            );
        }
        else {
            this.getData();
            return null;
        }
    }

    _onNodeClick = nodeId => {
        console.log('_onNodeClick');
        console.log(nodeId);
    };

    async getPopcodeById(id) {
        const body = {
            id
        };

        const res = await cayley.get('/popcodeById',{body});

        if(_.isNil(res.body) || _.isNil(res.body.popcodes)) {
            console.log("error loading popcode: " + id);
            return null;
        }

        const popcodes = res.body.popcodes;

        if(!_.isArray(popcodes) || popcodes.length < 1) {
            console.log("error loading popcode: " + id);
            return null;
        }

        return popcodes[0];

    }
    
  async getContainerPopcode(id) {
      const address = id.replace('<','').replace('>','');
      const body = {
        address
      };
     
      const res = await cayley.get('/containerPopcode',{body});
      
      if(_.isNil(res.body) || _.isNil(res.body.popcodes)) {
        console.log("error getting container popcode: " + id);
        return null;
      }
      
      const popcodes = res.body.popcodes;
      
      if(!_.isArray(popcodes) || popcodes.length < 1) {
        console.log("error getting container popcode: " + id);
        return null;
      }
      
      return popcodes[0];
    
  }

    async getData() {
        if(this.isLoading) return;
        this.isLoading = true;
        console.log('nttGraph getData');
        console.log(this.props);
        const {popcodeId} = this.props;


        var popcode = await this.getPopcodeById(popcodeId);
        if(_.isNil(popcode))
            return;

        if(!_.isNil(popcode.popcodeName) && _.startsWith(popcode.popcodeName,'C_')) {
            popcode = await this.getContainerPopcode(popcode.id)
            if(_.isNil(popcode))
                return;
        }

        this.popcode = popcode
        const nodes = []

        for(let transaction of popcode.transaction) {

            if (transaction.operation === 'bomUpdate'
                && _.filter(nodes, x=>x.operation === 'bomUpdate').length > 0) {

                const bomAddressId = `<${transaction.bomAddress}>`
                const bomPopcode = await this.getPopcodeById(bomAddressId);
                _.filter(nodes, x=>x.operation === 'bomUpdate')[0].childrens.push(bomPopcode);
                continue;
            }

            const popNode = {}
            popNode.operation = transaction.operation;
            popNode.displayAction= transaction.operation;
            popNode.stepName = transaction.operation;
            popNode.childrens = []

            if (transaction.operation === 'blobCreate') {

                popNode.displayAction= _.has(transaction, ['data','metadata','appData','stepTitle']) ?
                camelCaseToWords(transaction.data.metadata.appData.stepTitle) : transaction.operation
                popNode.stepName = _.has(transaction, ['data','metadata','appData','stepName']) ?
                    transaction.data.metadata.appData.stepName : transaction.operation

            }

            if (transaction.operation === 'bomUpdate') {

                const bomAddressId = `<${transaction.bomAddress}>`
                const bomPopcode = await this.getPopcodeById(bomAddressId);
                popNode.childrens.push(bomPopcode);
            }

            nodes.push(popNode)

        }
        this.nttNodes = nodes;
        this.graphData = this.buildGraph();
        this.haveData = true;
        this.forceUpdate();
        this.isLoading = false;
    }

    buildGraph(){
        console.log('nttGraph buildGraph');

        var popNodes = [];
        var popEdges = [];
        var first = true;
        var i;
        var linkNodeId = null;
        var shape = ''
        var label = ''
        var title = ''

        const getTitle = (obj) => {
            const t = obj.transaction[0]

            title = '<b>Blockchain Op:</b> mint';
            title += `<br><b>Popcode Name:</b> ${obj.popcodeName}`;
            title += `<br><b>Operation:</b> ${t.operation}`;
            title += `<br><b>Source Counter:</b> ${t.sourceCounter}`;
            title += `<br><b>Dest Counter:</b> ${t.destCounter}`;
            title += `<br><b>Unit:</b> ${obj.unit}`;
            title += `<br><b>Blockchain TX Id:</b> ${t.txId}`;
            title += `<br><b>Timestamp:</b> ${t.date}`;
            return title;
        }

        const addNode = (label,title,shape,image, parentId, style = {}) => {
            const n = {
                shape,
                title,
                id: i,
                label,
                ...style,
            };
            if(!_.isNil(image))
                n.image = image;

            if (first) {
                n.x = 0
                n.y = 0
            }


            popNodes.push(n);

            if(!first) {
                var from = parentId ? parentId : !_.isNil(linkNodeId) ? linkNodeId : i-1;
                var e = {
                    from,
                    to: i
                }
                popEdges.push(e);
            }

            i++;
            first = false;
            return n;
        };

        var nttPopcodes = this.nttNodes;

        first = true;
        i = 1
        this.selectedNodeId = i

        title = getTitle(this.popcode)
        addNode(this.popcode.popcodeName,title,'circle');

        linkNodeId = i-1;

        let bomUpdateNodes = []
        for(let nttNode of nttPopcodes) {
            shape = 'circle';
            label = nttNode.displayAction
            title = nttNode.stepName

            title = `<b>Step name: </b>${nttNode.stepName}`
            title += `<br/><b>Step title: </b>${nttNode.displayAction}`
            addNode(label,title,shape);
            linkNodeId++
            if (nttNode.childrens && nttNode.childrens.length > 0) {

                bomUpdateNodes.push({
                    bomUpdateId: i-1,
                    bomUpdateNode: nttNode
                })
            }
        }

        if (bomUpdateNodes.length > 0) {
            bomUpdateNodes.forEach(bomUpdateNode=> {
                bomUpdateNode.bomUpdateNode.childrens.forEach(child=> {
                    title = getTitle(child)
                    addNode(child.popcodeName, title, shape, '', bomUpdateNode.bomUpdateId, { color:'#97C2FC' });
                })
            })
        }

        return {nodes:popNodes,edges:popEdges};
    }
}

export { NttGraph };

import React from 'react';
import Graph from '../graphs/Graph';
import cayley from '../../api/cayley';
import _ from 'lodash';
//import { allPopcodes, visOpts } from './data';

class WineGraph extends React.Component {
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
      console.log('WineGraph getData');
      console.log(this.props);
      const {popcodeId} = this.props;
      
      
      var popcode = await this.getPopcodeById(popcodeId);
      if(_.isNil(popcode))
        return;
        
      var id,withdrawTrans;
      
      if(!_.isNil(popcode.popcodeName) && _.startsWith(popcode.popcodeName,'Wine')) {
        var winePopcode = popcode;
        withdrawTrans = _.filter(winePopcode.transaction, function(o) { 
          return !_.isNil(o.operation) && o.operation === 'withdraw';
        });
        
        if(_.isArray(withdrawTrans) && withdrawTrans.length > 0) {
            var t = withdrawTrans[0];
            id = t.destPopcode;
            
            popcode = await this.getPopcodeById(id);
        }
      }
      
      if(_.isNil(popcode))
        return;
        
      if(!_.isNil(popcode.popcodeName) && _.startsWith(popcode.popcodeName,'Truck')) {
        var truckPopcode = popcode;
        this.truckPopcode = truckPopcode;
        withdrawTrans = _.filter(truckPopcode.transaction, function(o) { 
          return !_.isNil(o.operation) && o.operation === 'withdraw';
        });
        console.dir(withdrawTrans);
        
        var winePopcodes = [];
        if(_.isArray(withdrawTrans) && withdrawTrans.length > 0) {
          for(let t of withdrawTrans) {
            id = t.sourcePopcode;
            
            var wp = await this.getPopcodeById(id);
            if(_.isNil(wp))
              continue;
            wp.withdrawAmount = t.destAmount;
            wp.withdrawTrans = _.merge({},t);
            winePopcodes.push(wp);
          }
        }
        //console.dir(winePopcodes);
        this.winePopcodes = winePopcodes;
      }
      
      if(!_.isNil(this.truckPopcode) && !_.isNil(this.winePopcodes)) {
        console.log({truckPopcode:this.truckPopcode,winePopcodes:this.winePopcodes});
        this.graphData = this.buildGraph();
        this.haveData = true;
        this.forceUpdate();
      }
      
    this.isLoading = false;
  }

  buildGraph(){
      console.log('WineGraph buildGraph');
      
      var nodeId = 1;
      var popNodes = [];
      var popEdges = [];
      //var lastNode;
      var first = true;
      var i;
      var linkNodeId = null;

      const addNode = (label,title,shape,image) => {
          const n = {
              shape,
              title,
              id: i,
              label
          };
          if(!_.isNil(image))
              n.image = image                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               ;
          popNodes.push(n);

          if(!first) {
              var from = !_.isNil(linkNodeId) ? linkNodeId : i-1;
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

        var popcode = this.truckPopcode;

        i = nodeId;
        first = true;
        addNode('truck','truck','image','https://popskip-01.skuchain.io/cayleymgr/image/truck.png');

        var t = popcode.transaction[0];

        var shape = 'circle';
        var label = 'Truck';
        var title = '<b>Blockchain Op:</b> mint';
        title += `<br><b>Popcode Name:</b> ${popcode.popcodeName}`;
        title += `<br><b>Wine Bottle Count:</b> ${popcode.wineBottles}`;
        title += `<br><b>Address:</b> ${t.address}`;
        title += `<br><b>Blockchain TX Id:</b> ${t.txId}`;
        title += `<br><b>Timestamp:</b> ${t.date}`;
        addNode(label,title,shape);

        linkNodeId = i-1;

        for(let wpopcode of this.winePopcodes) {
            t = wpopcode.withdrawTrans;
            shape = 'circle';
            label = 'Winemaker';
            title = '<b>Blockchain Op:</b> mint';
            title += `<br><b>Popcode Name:</b> ${wpopcode.popcodeName}`;
            title += `<br><b>Wine Bottle Count:</b> ${wpopcode.wineBottles}`;
            title += `<br><b>Operation:</b> ${t.operation}`;
            title += `<br><b>Source Address:</b> ${t.sourceAddress}`;
            title += `<br><b>Dest Address:</b> ${t.destAddress}`;
            title += `<br><b>Amount:</b> ${t.destAmount}`;
            title += `<br><b>Unit:</b> ${wpopcode.unit}`;
            title += `<br><b>Blockchain TX Id:</b> ${t.txId}`;
            title += `<br><b>Timestamp:</b> ${t.date}`;
            addNode(label,title,shape);
        }

        return {nodes:popNodes,edges:popEdges};

    }
}

export { WineGraph };

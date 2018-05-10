import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faArrowLeft from '@fortawesome/fontawesome-free-solid/faArrowLeft'

import Bracket from '../brackets/Bracket';

import { Route, Link } from 'react-router-dom';

import { Popcodes } from '../../domain/popcodes';

import { PopcodeRelationsGraph } from '../popcodes/PopcodeRelationsGraph';
import { PopcodeOperationsGraph } from '../popcodes/PopcodeOperationsGraph';
import { WineGraph } from '../wine/WineGraph';
import { CytoscapeGraph } from '../wine/CyptoGraph/Cytoscape';
// import { PopcodeLinksList } from '../popcodes/PopcodeLinksList';
import { PopcodeTimeline } from '../popcodes/PopcodeTimeline';
import { NttGraph } from '../ntt/nttGraph';
import PopcodeTable from '../popcodes/PopcodeTable';

class DashboardInternals extends React.Component {
  render() {
    return (
      <div>
        <Bracket>
          {this._renderPopcodeComponentRouteWithBackButton(
            'popcodeTimeline',
            PopcodeTimeline
          )}
          {this._renderPopcodeComponentRouteWithBackButton(
            'popcodeRelations',
            PopcodeRelationsGraph
          )}
          {this._renderPopcodeComponentRouteWithBackButton(
            'popcodeOperations',
              PopcodeOperationsGraph
          )}
          {this._renderPopcodeComponentRouteWithBackButton(
                'wineWorkflow',
              WineGraph
          )}
            {this._renderPopcodeComponentRouteWithBackButton(
                'wine-cytoscape',
                CytoscapeGraph
            )}
            {this._renderPopcodeComponentRouteWithBackButton(
                'nttdWorkflow',
                NttGraph
            )}

          <Route exact path="/" component={PopcodeTable} />
        </Bracket>
        <div />
      </div>
    );
  }

  _renderPopcodeComponentRouteWithBackButton(pathname, PopcodeComponent) {
    return (
      <Route
        path={`/${pathname}/:popcodeId`}
        render={({ match }) => (
          <div>
            <Link to="/"><FontAwesomeIcon icon={faArrowLeft} size="2x"/></Link>
            <PopcodeComponent popcodeId={match.params.popcodeId} />
          </div>
        )}
      />
    );
  }
}

// TODO: use some more appropriate data management approach like Redux-based
// after setting it up on the project level
export default class DashboardWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      popcodesFetched: false
    };
  }

  componentDidMount() {
    this._load();
  }

  async _load() {
    await Popcodes.fetchAll();
    this.setState({ popcodesFetched: true });
  }

  render() {
    return this.state.popcodesFetched && <DashboardInternals />;
  }
}

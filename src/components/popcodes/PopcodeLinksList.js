import React from 'react';

import { Popcodes } from "../../domain/popcodes";
import { Link } from 'react-router-dom';

const PopcodeLinksList = () => {
  return <div>
    <h3>All popcodes:</h3>
    <ul>
      {Popcodes.getAllPopcodesList().map(popcode => <li key={popcode.id}>
          <span>{popcode.popcodeName}:&nbsp;</span>
          <Link to={`/popcodeTimeline/${popcode.id}`}>
            Timeline
          </Link>
          &nbsp;|&nbsp;
          <Link to={`/popcodeOperations/${popcode.id}`}>
            Operations
          </Link>
          &nbsp;|&nbsp;
          <Link to={`/popcodeRelations/${popcode.id}`}>
            Related popcodes
          </Link>
        </li>,
      )}
    </ul>
  </div>;
};

export { PopcodeLinksList };

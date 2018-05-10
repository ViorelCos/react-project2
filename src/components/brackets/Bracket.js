import React from 'react';
import classNames from 'classnames';
import './Bracket.css';

function Bracket({ children, small }) {
  return (
    <div className={classNames('bracket', { 'bracket-small': small })}>
      <div className="inner-bracket">
        {children}
      </div>
    </div>
  );
}

export default Bracket;

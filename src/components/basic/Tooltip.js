import React from 'react'

import RcTooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';

import './Tooltip.css'

class Tooltip extends React.Component {
  render () {
    return <RcTooltip
      overlay={this.props.contents}
      placement={this.props.placement}
      trigger={this.props.triggerOn}
      overlayClassName='skc-tooltip'
    >
      {this.props.children}
    </RcTooltip>
  }
}

const TooltipOptions = {
  placement: {
    RIGHT_TOP: 'rightTop',
  },

  triggerOn: {
    CLICK: 'click',
    HOVER: 'hover'
  }
}

export {
  Tooltip,
  TooltipOptions
}

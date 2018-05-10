import React from 'react';
import { Timeline, Icon } from 'antd';

import { Popcodes } from '../../domain/popcodes';
import { Tooltip, TooltipOptions } from "../basic/Tooltip";

const getDateTimeFromEpoch = epoch => {
  let iEpoch = parseInt(epoch.substr(0, 10), 10);
  let nDate = new Date(0);
  nDate.setUTCSeconds(iEpoch);
  return nDate;
};

function camelCaseToWords(str) {
  return str
    .match(/^[a-z]+|[A-Z][a-z]*/g)
    .map(function(x) {
      return x[0].toUpperCase() + x.substr(1).toLowerCase();
    })
    .join(' ');
}

const timelineStyles = {
  harvestCorn: { color: 'green', icon: 'right-circle-o' },
  grainElevator: { color: 'red', icon: 'left-circle-o' },
  merchandiser: { color: 'red', icon: 'scan' },
  dairyFarmer: { color: 'blue', icon: 'dropbox' },
  milkProducder: { color: 'green' },
  iceCreamFactory: { color: 'green' }
};

const getColor = state => timelineStyles[state] && timelineStyles[state].color;
const getTimelineItemIcon = state => {
  const type = timelineStyles[state] && timelineStyles[state].icon;
  if (!type) return null;

  return <Tooltip
    placement={TooltipOptions.placement.RIGHT_TOP}
    triggerOn={TooltipOptions.triggerOn.CLICK}
    contents={
      <div>Timeline item info here!</div>
    }
  >
      <Icon type={type} style={{ fontSize: 16 }}/>
  </Tooltip>;
};

class PopcodeTimeline extends React.Component {
  state = { showInfo: false };

  _getPopcode() {
    return Popcodes.getById(this.props.popcodeId);
  }

  clickInfoHandler = () => {
    this.setState({ showInfo: !this.state.showInfo });
  };

  render() {
    const popcode = this._getPopcode();

    const timelineList = popcode.transaction.map((transaction, index) => {
      let key = index + 1;
      let displayDate = getDateTimeFromEpoch(transaction.date).toLocaleString();
      let stepName = '';
      let displayAction = '';
      if (transaction.operation === 'blobCreate') {
        stepName = transaction.data.metadata.appData.stepName;
        displayAction = transaction.data.metadata.appData.stepTitle;
      } else {
        displayAction = camelCaseToWords(transaction.operation);
      }
      return (
        <Timeline.Item
          key={key}
          dot={getTimelineItemIcon(stepName)}
          color={getColor(stepName)}
        >
          {displayAction} <strong>on</strong> {displayDate}
        </Timeline.Item>
      );
    });

    return (
      <div style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
      }}>
        <div>
          {this._renderPopcodeBubble()}
        </div>
        <Timeline style={{ marginTop: 35}}>
          {timelineList}
        </Timeline>
      </div>
    );
  }

  _renderPopcodeBubble () {
    const popcode = this._getPopcode();

    const bubbleDiameter = '100px';

    // TODO: deduplicate with graph colors
    const bubbleColor = '#03A9F4';

    return <Tooltip
      placement={TooltipOptions.placement.RIGHT_TOP}
      triggerOn={TooltipOptions.triggerOn.CLICK}
      contents={
        <div>Popcode info here!</div>
      }
    >
      <div>
        <div style={{
          background: bubbleColor,
          width: bubbleDiameter,
          height: bubbleDiameter,
          borderRadius: '50%',
        }}>
        </div>
        {popcode.popcodeName}

      </div>
    </Tooltip>;
  }
}

export { PopcodeTimeline };

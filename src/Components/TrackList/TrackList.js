import React, { Component } from 'react';
import Track from '../Track/Track';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class TrackList extends Component {
  render() {
    return (
      <div className="TrackList">
        <ReactCSSTransitionGroup
          transitionName="SearchTrack"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
        >
          {Object.values(this.props.results).map((item, index) => {
            return (
              <Track
                key={index}
                context={this.props.context}
                item={item}
                onClick={this.props.onClick}
              />
            );
          })}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default TrackList;

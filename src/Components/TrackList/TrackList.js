import React, { Component } from 'react';
import Track from '../Track/Track';

class TrackList extends Component {
  render() {
    return (
      <div className="TrackList">
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
      </div>
    );
  }
}

export default TrackList;

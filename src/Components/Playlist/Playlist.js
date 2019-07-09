import React, { Component } from 'react';
import Track from '../Track/Track';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Playlist extends Component {
  render() {
    return (
      <div className="Playlist">
        <input value={this.props.name} onChange={this.props.onChange} />
        <div className="TrackList">
          <ReactCSSTransitionGroup
            transitionName="Track"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
          >
            {this.props.playlist.map((item, index) => {
              return (
                <Track
                  key={index}
                  context="Playlist"
                  item={item}
                  onClick={this.props.onClick}
                />
              );
            })}
          </ReactCSSTransitionGroup>
        </div>
        <button className="Playlist-save" onClick={this.props.onSave}>
          SAVE TO SPOTIFY
        </button>
      </div>
    );
  }
}

export default Playlist;

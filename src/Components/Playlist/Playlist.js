import React, { Component } from 'react';
import Track from '../Track/Track';

class Playlist extends Component {
  render() {
    return (
      <div className="Playlist">
        <input value={this.props.name} onChange={this.props.onChange} />
        <div className="TrackList">
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
        </div>
        <a className="Playlist-save" onClick={this.props.onSave}>
          SAVE TO SPOTIFY
        </a>
      </div>
    );
  }
}

export default Playlist;

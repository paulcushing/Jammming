import React, { Component } from 'react';

class Track extends Component {
  static defaultProps = {
    item: {
      name: 'Song Title',
      artist: 'Song Artist',
      album: 'Song Album'
    }
  };

  onClick = e => {
    this.props.onClick(this.props.item);
  };

  render() {
    let action = '';
    if (this.props.context === 'SearchResults') {
      action = '+';
    } else {
      action = '-';
    }

    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.item.name}</h3>
          <p>
            {this.props.item.artists[0].name} | {this.props.item.album.name}
          </p>
        </div>
        <a className="Track-action" onClick={this.onClick}>
          {action}
        </a>
      </div>
    );
  }
}

export default Track;

import React, { Component } from 'react';

class SearchBar extends Component {
  render() {
    let buttonText = this.props.auth ? 'SEARCH' : 'LOGIN TO SPOTIFY';
    let inputStatus = this.props.auth ? '' : 'hidden';

    return (
      <div className="SearchBar">
        <input
          placeholder="Enter A Song Title"
          type="text"
          value={this.props.term}
          onChange={this.props.onChange}
          className={inputStatus}
        />{' '}
        <button onClick={this.props.onClick}>{buttonText}</button>
      </div>
    );
  }
}

export default SearchBar;

import React, { Component } from 'react';

class SearchBar extends Component {
  render() {
    return (
      <div className="SearchBar">
        <input
          placeholder="Enter A Song Title"
          type="text"
          value={this.props.term}
          onChange={this.props.onChange}
        />{' '}
        <a onClick={this.props.onClick}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;

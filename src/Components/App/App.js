import React, { Component } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../Spotify/Spotify';

const spotify = new Spotify();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: spotify.checkAuthority(),
      term: '',
      searchResults: {},
      playlistName: 'New Playlist',
      playlist: []
    };
  }

  handleSearch = () => {
    if (this.state.auth) {
      spotify.search(this.state.term).then(result => {
        if (result !== undefined) {
          this.setState({ searchResults: result });
        } else {
          console.log(
            'You may need to renew your login or you forgot a search term'
          );
        }
      });
    } else {
      spotify.authorize();
    }
  };

  handleTermChange = e => {
    this.setState({ term: e.target.value });
  };

  handleAddTrack = item => {
    /** To-Do: Check if in playlist already before adding. */
    this.setState({ playlist: [...this.state.playlist, item] });
  };

  handleRemoveTrack = item => {
    const newPlaylist = this.state.playlist.filter(function(obj) {
      return obj.id !== item.id;
    });

    this.setState({ playlist: newPlaylist });
  };

  handlePlaylistChange = e => {
    this.setState({ playlistName: e.target.value });
  };

  handleSavePlaylist = e => {
    const playlistUris = this.state.playlist.map(item => {
      return item.uri;
    });
    spotify.savePlaylist(this.state.playlistName, playlistUris);
  };

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar
            auth={this.state.auth}
            onClick={this.handleSearch}
            onChange={this.handleTermChange}
            term={this.state.term}
          />
          <div className="App-playlist">
            <SearchResults
              results={this.state.searchResults}
              onClick={this.handleAddTrack}
            />
            <Playlist
              onClick={this.handleRemoveTrack}
              playlist={this.state.playlist}
              onChange={this.handlePlaylistChange}
              name={this.state.playlistName}
              onSave={this.handleSavePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

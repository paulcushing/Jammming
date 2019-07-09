import React, { Component } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Dialog from '../Dialog/Dialog';
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
      playlist: [],
      dialogMessage: ''
    };
  }

  handleSearch = () => {
    if (this.state.auth) {
      spotify.search(this.state.term).then(result => {
        if (result !== undefined) {
          this.setState({ searchResults: result });
        } else {
          spotify.authorize();
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
    let newResults = this.state.searchResults.filter(function(obj) {
      return obj.id !== item.id;
    });

    this.setState({ searchResults: newResults });
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
    if (this.state.playlistName === 'New Playlist') {
      this.setState({ dialogMessage: "Don't forget to name your playlist" });
    } else {
      const playlistUris = this.state.playlist.map(item => {
        return item.uri;
      });
      spotify.savePlaylist(this.state.playlistName, playlistUris);

      this.setState({
        dialogMessage: 'Success! Your playlist has been saved.',
        playlistName: 'New Playlist',
        playlist: [],
        term: '',
        searchResults: {}
      });
    }
  };

  handleCloseDialog = e => {
    this.setState({ dialogMessage: '' });
  };

  render() {
    const fullHeight = {
      height: '100%'
    };
    return (
      <div style={fullHeight}>
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
          <div
            className={this.state.auth ? 'App-playlist' : 'App-playlist hidden'}
          >
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
        {this.state.dialogMessage === '' ? null : (
          <Dialog
            message={this.state.dialogMessage}
            onClick={this.handleCloseDialog}
          />
        )}
      </div>
    );
  }
}

export default App;

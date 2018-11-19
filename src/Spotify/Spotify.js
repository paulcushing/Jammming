class Spotify {
  stateKey = 'spotify_auth_state';

  getHashParams = () => {
    var hashParams = {};
    var e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  };

  getAccessToken = () => {
    const params = this.getHashParams();
    return params.access_token;
  };

  checkAuthority = () => {
    if (this.getHashParams().access_token) {
      localStorage.setItem('token', this.getAccessToken());
      window.history.replaceState({}, document.title, '/');
      return true;
    } else if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  };

  async search(term) {
    const endPoint = 'https://api.spotify.com/v1/search?q=';
    const corsHelper = 'https://cors-anywhere.herokuapp.com/';
    const typeQuery = '&type=track';
    const limit = '&limit=15';

    return fetch(corsHelper + endPoint + term + typeQuery + limit, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        if (jsonResponse) {
          return jsonResponse.tracks.items;
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  generateRandomString = length => {
    let text = '';
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  authorize = () => {
    const client_id = '486787cd97e848c6bca936c81668b3a5';
    const redirect_uri = window.location.href; // Your redirect uri
    const state = this.generateRandomString(16);
    localStorage.setItem(this.stateKey, state);
    const scope =
      'user-read-private user-read-email playlist-read-private playlist-modify-private';
    let url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(client_id);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    url += '&state=' + encodeURIComponent(state);
    window.location = url;
  };

  getUserId = () => {
    const endPoint = 'https://api.spotify.com/v1/me';
    const corsHelper = 'https://cors-anywhere.herokuapp.com/';

    return fetch(corsHelper + endPoint, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        if (jsonResponse) {
          return jsonResponse.id;
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  savePlaylist = (playlistName, playlist) => {
    this.getUserId().then(userId => {
      const endPoint = `https://api.spotify.com/v1/users/${userId}/playlists`;
      const corsHelper = 'https://cors-anywhere.herokuapp.com/';

      const requestBody = {
        name: playlistName,
        description: 'Playlist created by Jammming',
        public: false
      };

      fetch(corsHelper + endPoint, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          Accept: 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(requestBody)
      })
        .then(response => {
          return response.json();
        })
        .then(jsonResponse => {
          const playlistId = jsonResponse.id;
          const songsBody = {
            uris: playlist
          };

          const addSongsEndPoint = `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`;

          fetch(corsHelper + addSongsEndPoint, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
              Accept: 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(songsBody)
          }).catch(error => {
            console.log(error);
          });
        })
        .catch(error => {
          console.log(error);
        });
    });
  };
}

export default Spotify;

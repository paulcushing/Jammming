# Ja*mmm*ing by Paul Cushing

This is a React application written for the CodeAcademy.com's [**Build Front-End Web Applications from Scratch**](https://www.codecademy.com/pro/intensive/build-frontend-web-apps-from-scratch) Pro Intensive course.

## App Feature Requirements:

- Spotify Login — the first time a user searches for a song, album, or artist, Spotify will ask them to log in or set up a new account. You will need to follow the steps in the Spotify Developer Guide to register your application.

- Search by Song, Album, or Artist — a user can type the name of a song, artist, or album into the search bar and click the SEARCH button. The app will request song data about the user's input from the Spotify library (find Spotify endpoints here).

- Populate Results List — Jammming displays the list of returned tracks from the user's query.

- Add Song to a Custom Playlist — users can add a track to their playlist by selecting a + sign on the right side of the track's display container.

- Remove Song from Custom Playlist — users can remove a track from their playlist by selecting a - sign on the right side of the track's display container.

- Change Playlist Title — users can change the title of their custom playlist.

- Save Playlist to Account — users can save their custom playlist by clicking a button called SAVE TO SPOTIFY.

## Future

After the code is reviewed, there are a handful of improvements I'd like to make.

- [x] Prior to giving permission through Spotify, I'd like to change the button to "Authenticate with Spotify" or something along those lines.

- [ ] In the add track to playlist handler, I think I'll check if the song is already in the playlist to eliminate duplicates. It would also be good to remove the added song from the search results track list.

- [x] I'll implement a dialog confirming that the new playlist was saved to Spotify.

### Demo

Currently deployed at https://happy-edison-ed4e45.netlify.com courtesy of the amazing folks at Netlify.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

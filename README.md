# Vibify Client

Vibify Client is an npm package that provides a JavaScript interface for interacting with the Vibify API. It allows you to make various API calls to retrieve user information, top tracks, top artists, and more from the Vibify service.

## About

Vibify Client fully depends on [Vibify]("https://github.com/justin0122/vibify").

The Vibify API is a RESTful API that provides access to user data, top tracks, top artists, and more. It is a simple and easy-to-use API that allows you to retrieve user information, top tracks, top artists, and more from the Vibify service.
The guide of the API can be found on the GitHub page of the project.

It may soon become a public API, but for now you will need to set up your own server to use the Vibify Client.

## Installation

To install the Vibify Client, use the following command:

```bash
npm i @vibify/vibify
```

## Usage

To use the Vibify Client, you will need to import the package and create a new instance of the client. You will also need to set the `VIBIFY_API_URL` and `APPLICAITON_ID` environment variables to the URL of your Vibify API server and the application ID of your Vibify application.

```javascript
const Vibify = require('@vibify/vibify');

const client = new Vibify();
```

You can then use the client to make various API calls to retrieve user information, top tracks, top artists, and more:

```javascript
const user = await client.getUser('username');
const topTracks = await client.getTopTracks('username');
const topArtists = await client.getTopArtists('username');
const createPlaylist = await client.createPlaylist('username', 'playlistName', "month", "year");
const createRecommendationPlaylist = await client.createRecommendationPlaylist('username', 'genre', 'recentlyPlayed', 'mostPlayed', 'likedSongs', 'currentlyPlaying', 'audioFeatures');
const getAudioFeatures = await client.getAudioFeatures('playlistId', 'userId');
```

### Note:
The `createRecommendationPlaylist` method accepts a `audioFeatures` parameter, which can be `true` or `false`.

If `true`, the playlist is based on the user's track audio features, reducing the impact of the `genre` parameter.
This can have unexpected results, as the playlist may not be based on the genre specified.


## Example

```env
VIBIFY_API_URL=http://localhost:3000
APPLICATION_ID=your_application_id //The same as the one in the Vibify API
```

```javascript
require('dotenv').config();
const Vibify = require('@vibify/vibify');

const client = new Vibify();

const user = await client.getUser('user');
console.log(user);

const recommendations = await client.createRecommendationPlaylist('user', 'pop', 'true', 'true', 'true', 'true', 'false');
console.log(recommendations);

const audioFeatures = await client.getAudioFeatures(recommendations.id, 'user');

console.log(audioFeatures);

```
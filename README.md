# Vibify Client

Vibify Client is an npm package that provides a JavaScript interface for interacting with the Vibify API. It allows you to make various API calls to retrieve user information, top tracks, top artists, and more from the Vibify service.

## About

Vibify Client fully depends on [Vibify]("https://github.com/justin0122/vibify")


## Installation

To install the Vibify Client, use the following command:

```bash
npm i @vibify/vibify
```

## Usage

To use the Vibify Client, you will need to import the package and create a new instance of the client. You will also need to set the `VIBIFY_API_KEY` environment variable to your Vibify API key.

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
const createRecommendationPlaylist = await client.createRecommendationPlaylist('username', 'genre', 'recentlyPlayed', 'mostPlayed', 'likedSongs', 'currentlyPlaying');
const getAudioFeatures = await client.getAudioFeatures('playlistId', 'userId');
```

## Example

```env
VIBIFY_API_KEY=your_api_key
```

```javascript
require('dotenv').config();
const Vibify = require('@vibify/vibify');

const client = new Vibify();

const user = await client.getUser('user');
console.log(user);

const recommendations = await client.createRecommendationPlaylist('user', 'pop', 'true', 'true', 'true', 'true');
console.log(recommendations);

const audioFeatures = await client.getAudioFeatures(recommendations.id, 'user');

console.log(audioFeatures);

```
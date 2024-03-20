const dotenv = require('dotenv');
const max = 25;
dotenv.config();

class Vibify {
    apiUrl = process.env.VIBIFY_API_URL;

    async makeApiCall(url, method = "GET", body = {}) {
        const headers = { 'x-application-id': process.env.APPLICATION_ID };
        const options = { method, headers };
        if (method === 'POST' || method === 'PUT') {
            headers['Content-Type'] = 'application/json';
            options.body = JSON.stringify(body);
        }
        const response = await fetch(this.apiUrl + url, options);
        const text = await response.text();
        return JSON.parse(text);
    }

    getUser = (userId) => this.makeApiCall(`/user/${userId}`);

    getCurrentlyPlaying = (userId) => this.makeApiCall(`/currently-playing/${userId}`);

    getTopTracks = (userId, amount = 25) => this.makeApiCall(`/top-tracks/${userId}?amount=${amount}`);

    getLastListenedTracks = (userId, amount = 25) => this.makeApiCall(`/last-listened/${userId}?amount=${amount}`);

    getTopArtists = (userId, amount = 25) => this.makeApiCall(`/top-artists/${userId}?amount=${amount}`);

    getLastLikedSongs = (userId, amount = 25) => this.makeApiCall(`/liked-songs/${userId}?amount=${amount}`);

    getPlaylists = (userId, amount = 25, offset = 0) => this.makeApiCall(`/playlists/${userId}?amount=${amount}&offset=${offset}`);

    getAudioFeatures = (playlistId, userId) => this.makeApiCall(`/audio-features/${playlistId}/${userId}`);

    createRecommendationPlaylist(userId, genre = null, recentlyPlayed = false, mostPlayed = true, likedSongs = true, currentlyPlaying = false, useAudioFeatures = true, useTrackSeeds = false, targetValues = {}, amount = max) {
        const body = {
            id: userId,
            genre: genre,
            recentlyPlayed: recentlyPlayed,
            mostPlayed: mostPlayed,
            likedSongs: likedSongs,
            currentlyPlaying: currentlyPlaying,
            useAudioFeatures: useAudioFeatures,
            useTrackSeeds: useTrackSeeds,
            targetValues: targetValues,
            amount: amount
        };
        return this.makeApiCall('/recommendations', 'POST', body);
    }

    createPlaylist(userId, playlistName, month, year, genre = undefined) {
        const body = {
            id: userId,
            month: month,
            year: year,
            playlistName: playlistName,
            genre: genre
        };
        console.log(body);
        return this.makeApiCall('/create-playlist', 'POST', body);

    }

    logout = (id) => this.makeApiCall('/delete-user/${id}');
    authorize = (id) => this.makeApiCall('/authorize/${id}');
}

module.exports = Vibify;
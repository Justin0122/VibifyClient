const max = 25;

class Vibify {

    constructor(url, apiToken = null, userToken = undefined) {
        if (!apiToken && !userToken) {
            throw new Error('Either apiToken or userToken must be set');
        }
        this.apiUrl = url;
        this.apiToken = apiToken;
        this.userToken = userToken;
    }

    async makeApiCall(url, method = "GET", body = {}) {
        const headers = {};
        if (this.apiToken) {
            headers['x-application-id'] = this.apiToken;
        }
        if (this.userToken) {
            headers['x-api-key'] = this.userToken;
        }
        const options = {method, headers};
        if (method === 'POST' || method === 'PUT') {
            headers['Content-Type'] = 'application/json';
            options.body = JSON.stringify(body);
        }
        const response = await fetch(this.apiUrl + url, options);
        const text = await response.text();
        try {
            return {status: response.status, body: JSON.parse(text)};
        } catch (error) {
            // If it's not JSON, return the text directly
            return {status: response.status, body: text};
        }
    }

    getUser = (userId) => this.makeApiCall(`/user/${userId}`);

    getCurrentlyPlaying = (userId) => this.makeApiCall(`/currently-playing/${userId}`);

    getTopTracks = (userId, amount = 25, offset = 0) => this.makeApiCall(`/top-tracks/${userId}?amount=${amount}&offset=${offset}`);

    getLastListenedTracks = (userId, amount = 25, offset = 0) => this.makeApiCall(`/last-listened/${userId}?amount=${amount}&offset=${offset}`);

    getTopArtists = (userId, amount = 25, offset = 0) => this.makeApiCall(`/top-artists/${userId}?amount=${amount}&offset=${offset}`);

    getLastLikedTracks = (userId, amount = 25, offset = 0) => this.makeApiCall(`/last-liked/${userId}?amount=${amount}&offset=${offset}`);

    getPlaylists = (userId, amount = 25, offset = 0) => this.makeApiCall(`/playlists/${userId}?amount=${amount}&offset=${offset}`);

    getAudioFeatures = (playlistId, userId) => this.makeApiCall(`/audio-features/${playlistId}/${userId}`);

    createRecommendationPlaylist(userId, genre = null, recentlyPlayed = false, mostPlayed = true, likedTracks = true, currentlyPlaying = false, useAudioFeatures = true, useTrackSeeds = false, targetValues = {}, amount = max) {
        const body = {
            id: userId,
            genre: genre,
            recentlyPlayed: recentlyPlayed,
            mostPlayed: mostPlayed,
            likedTracks: likedTracks,
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
        return this.makeApiCall('/create-playlist', 'POST', body);
    }

    filterLikedTracks(userId, filter, playlistName) {
        const body = {
            id: userId,
            filter: filter,
            playlistName: playlistName
        };
        return this.makeApiCall('/filter-liked-tracks', 'POST', body);
    }

    logout = (id) => this.makeApiCall(`/delete-user/${id}`);
    authorize = (id) => this.makeApiCall(`/authorize/${id}`);
}

export default Vibify;
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

    getTopTracks = (userId, amount = 25, offset = 0) => this.makeApiCall(`/top/tracks/${userId}?limit=${amount}&offset=${offset}`);

    getLastListenedTracks = (userId, amount = 25, offset = 0) => this.makeApiCall(`/recently-played/${userId}?limit=${amount}&offset=${offset}`);

    getTopArtists = (userId, amount = 25, offset = 0) => this.makeApiCall(`/top/artists/${userId}?limit=${amount}&offset=${offset}`);

    getLastLikedTracks = (userId, amount = 25, offset = 0) => this.makeApiCall(`/liked/tracks/${userId}?limit=${amount}&offset=${offset}`);

    getPlaylists = (userId, amount = 25, offset = 0) => this.makeApiCall(`/playlists/${userId}?limit=${amount}&offset=${offset}`);

    createPlaylist(userId, playlistName, month, year, genre = undefined) {
        return this.makeApiCall(`/playlist/create/${userId}?name=${playlistName}&month=${month}&year=${year}${genre ? `&genre=${genre}` : ''}`);
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

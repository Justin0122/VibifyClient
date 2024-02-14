const dotenv = require('dotenv');
dotenv.config();
const max = 25;
const apiUrl = process.env.VIBIFY_API_URL;

/**
 * Vibify class to handle all Vibify API calls
 * @class
 * @classdesc Class to handle all Vibify API calls
 */
class Vibify {

    /**
     * Make a Vibify API call and handle token refresh if necessary
     * @param {string} apiCall - The Vibify API call to make
     * @param {string} method - The method to use for the API call
     * @param {object} [body] - The body to send with the API call
     * @returns {Promise} - The response from the Vibify API
     * @throws {Error} - Failed to make Vibify API call
     */
    async makeSpotifyApiCall(apiCall, method = "GET", body = {}) {
        const headers = {
            'x-application-id': process.env.APPLICATION_ID,
        };
        const baseUrl = `${apiUrl}`;
        if (method === 'POST' || method === 'PUT') {
            headers['Content-Type'] = 'application/json';
        }
        if (method === 'POST') {
            return await fetch(baseUrl + apiCall, {
                method,
                headers,
                body: JSON.stringify(body)
            })
                .then(res => res.text())
                .then(text => {
                    return JSON.parse(text);
                });
        }
        return await fetch(baseUrl + apiCall, {
            method,
            headers
        })
            .then(res => res.text())
            .then(text => {
                try {
                    return JSON.parse(text);
                } catch (e) {
                    return text;
                }
            });
    }

    /**
     * Get the user's Vibify information
     * @param {string} userId - The user's  ID
     * @returns {Promise} - The user's Vibify information
     */
    async getUser(userId) {
        const url = `/user/${userId}`;
        return await this.makeSpotifyApiCall(url)
    }

    /**
     * Get the user's currently playing track
     * @param {string} userId - The user's  ID
     * @returns {Promise} - The user's currently playing track
     * @throws {Error} - Failed to retrieve currently playing track
     */
    async getCurrentlyPlaying(userId) {
        const url = `/currently-playing/${userId}`;
        return await this.makeSpotifyApiCall(url);
    }

    /**
     * Get the user's top tracks
     * @param {string} userId - The user's  ID
     * @param {number} [amount=25] - The amount of top tracks to retrieve. Default is the value of the constant 'max'.
     * @returns {Promise} - The user's top tracks
     * @throws {Error} - Failed to retrieve top tracks
     */
    async getTopTracks(userId, amount = max) {
        const url = `/top-tracks/${userId}?amount=${amount}`;
        return await this.makeSpotifyApiCall(url);
    }

    /**
     * Get the user's last listened tracks
     * @param {string} userId - The user's  ID
     * @param {number} [amount=25] - The amount of last listened tracks to retrieve. Default is the value of the constant 'max'.
     * @returns {Promise} - The user's last listened tracks
     * @throws {Error} - Failed to retrieve last listened tracks
     */
    async getLastListenedTracks(userId, amount = max) {
        const url = `/last-listened/${userId}?amount=${amount}`;
        return await this.makeSpotifyApiCall(url);
    }

    /**
     * Get the user's top artists
     * @param {string} userId - The user's  ID
     * @param {number} [amount=25] - The amount of top artists to retrieve. Default is the value of the constant 'max'.
     * @returns {Promise} - The user's top artists
     * @throws {Error} - Failed to retrieve top artists
     */
    async getTopArtists(userId, amount = max) {
        const url = `/top-artists/${userId}?amount=${amount}`;
        return await this.makeSpotifyApiCall(url);
    }

    /**
     * Get the user's top tracks
     * @param {string} userId - The user's  ID
     * @param {string} playlistName - The name of the playlist to create
     * @param {number} month - The month to create the playlist for
     * @param {number} year - The year to create the playlist for
     * @returns {Promise} - The created playlist
     * @throws {Error} - Failed to create playlist
     */
    async createPlaylist(userId, playlistName, month, year) {
        const url = `/create-playlist`;
        return await this.makeSpotifyApiCall(url, 'POST', {
            id: userId,
            month: month,
            year: year,
            playlistName: playlistName
        });
    }

    /**
     * Get the audio features for a playlist
     * @param {string} playlistId - The ID of the playlist
     * @param {string} userId - The user's  ID
     * @returns {Promise<void>}
     */
    async getAudioFeatures(playlistId, userId) {
        const url = `/audio-features/${playlistId}/${userId}`;
        return await this.makeSpotifyApiCall(url);
    }

    /**
     * Creates a recommendation playlist.
     * @param {string} userId - The user's  ID.
     * @param {string} genre - The genre.
     * @param {boolean} recentlyPlayed - Whether to include recently played tracks.
     * @param {boolean} mostPlayed - Whether to include most played tracks.
     * @param {boolean} likedSongs - Whether to include liked songs.
     * @param {boolean} currentlyPlaying - Whether to include currently playing track.
     * @param {boolean} useAudioFeatures - Whether to use audio features to create the playlist.
     * @param {boolean} useTrackSeeds - Whether to use track seeds to create the playlist.
     * @param {Object} [targetValues={}] - The target values for audio features.
     * @returns {Promise} - The created recommendation playlist.
     */
async createRecommendationPlaylist(userId, genre = null, recentlyPlayed = false, mostPlayed = true, likedSongs = true, currentlyPlaying = false, useAudioFeatures = true, useTrackSeeds = false, targetValues = {}) {
    const url = `/recommendations`;
    return await this.makeSpotifyApiCall(url, 'POST', {
        id: userId,
        genre,
        recentlyPlayed,
        mostPlayed,
        likedSongs,
        currentlyPlaying,
        useAudioFeatures,
        useTrackSeeds,
        targetValues
    });
}

    async logout(id) {
        const url = `/delete-user/${id}`;
        return await this.makeSpotifyApiCall(url);
    }
}

module.exports = Vibify;

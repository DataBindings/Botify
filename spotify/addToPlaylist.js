/**
 * Add a track to a Spotify playlist using the Spotify Web API.
 *
 * @param {string} token - The access token for making authenticated API requests.
 * @param {string} playlist_id - The unique identifier of the target Spotify playlist.
 * @param {string} uri - The Spotify track URI (Uniform Resource Identifier) of the track to be added.
 * 
 * @throws {Error} - Throws an error with descriptive messages for specific error conditions:
 *   - Throws "Failed to add to Spotify playlist: Incorrect access token" (Status 401): When the provided access token is incorrect or expired.
 *   - Throws "Failed to add to Spotify playlist: Bad OAuth request" (Status 403): When the token lacks the necessary permissions to access playlists.
 *   - Throws "Failed to add to Spotify playlist: Rate limit exceeded" (Status 429): When the request rate limit has been exceeded.
 *   - Throws "Failed to add to Spotify playlist: Server error" (Status 500 and above): When the Spotify server encounters an error.
 *   - Throws "Failed to add to Spotify playlist: Unknown error" (Other status codes): For any other unexpected errors.
 * 
 * @returns {Promise<Object>} - A Promise that resolves to the response data from the API.
 */
const addToPlaylist = async (token, playlist_id, uri) => {
  // Spotify Accounts API endpoint URL
  const url = `https://api.spotify.com/v1/playlists/${playlist_id}/tracks?uris=spotify:track:${uri}`;

  // Make an HTTP POST request to obtain a new access token
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  // Check for errors in the API response and handle accordingly.
  if (!response.ok) {
    // Different error messages are thrown based on the response status code.
    if (response.status === 401) {
      throw new Error("Failed to add to Spotify playlist: Incorrect access token");
    } else if (response.status === 403) {
      throw new Error("Failed to add to Spotify playlist: Bad OAuth request");
    } else if (response.status === 429) {
      throw new Error("Failed to add to Spotify playlist: Rate limit exceeded");
    } else if (response.status >= 500) {
      throw new Error("Failed to add to Spotify playlist: Server error");
    } else {
      throw new Error("Failed to add to Spotify playlist: Unknown error");
    }
  }

  // Parse the response data as JSON.
  const data = await response.json();

  // Return the JSON response data.
  return data
}

export default addToPlaylist;
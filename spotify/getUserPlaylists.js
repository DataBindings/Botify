import querystring from "node:querystring";

/**
 * Asynchronous function to fetch a user's Spotify playlists using the Spotify Web API.
 *
 * @param {string} token - The Spotify access token for authorization.
 * @param {number} [limit=20] - The maximum number of playlists to retrieve (default is 20).
 * @param {number} [offset=0] - The offset to start retrieving playlists (default is 0).
 *
 * @throws {Error} If there are errors during the API request, this function throws different error messages based on the scenario:
 *   - "Failed to list Spotify playlists: Incorrect access token" (Status 401): When the provided access token is incorrect or expired.
 *   - "Failed to list Spotify playlists: Insufficient permissions" (Status 403): When the token lacks the necessary permissions to access playlists.
 *   - "Failed to list Spotify playlists: User not found" (Status 404): When the user associated with the token is not found.
 *   - "Failed to list Spotify playlists: Rate limit exceeded" (Status 429): When the request rate limit has been exceeded.
 *   - "Failed to list Spotify playlists: Server error" (Status 500 and above): When the Spotify server encounters an error.
 *   - "Failed to list Spotify playlists: Unknown error" (Other status codes): For any other unexpected errors.
 *
 * @returns {Object} The retrieved playlist data in JSON format.
 */
const getUserPlaylists = async (token, limit = 20, offset = 0) => {
  // Construct the query parameters for the API request.
  const query = querystring.stringify({
    limit: limit,
    offset: offset,
  });

  // Build the URL for fetching user playlists.
  const url = `https://api.spotify.com/v1/me/playlists?${query}`;

  // Perform a GET request to the Spotify Web API with the provided access token.
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  // Parse the response data as JSON.
  const data = await response.json();

  // Check for errors in the API response and handle accordingly.
  if (!response.ok) {
    // Different error messages are thrown based on the response status code.
    if (response.status === 401) {
      throw new Error("Failed to list Spotify playlists: Incorrect access token");
    } else if (response.status === 403) {
      throw new Error("Failed to list Spotify playlists: Insufficient permissions");
    } else if (response.status === 404) {
      throw new Error("Failed to list Spotify playlists: User not found");
    } else if (response.status === 429) {
      throw new Error("Failed to list Spotify playlists: Rate limit exceeded");
    } else if (response.status >= 500) {
      throw new Error("Failed to list Spotify playlists: Server error");
    } else {
      throw new Error("Failed to list Spotify playlists: Unknown error");
    }
  }

  // Return the retrieved playlist data.
  return data;
}

export default getUserPlaylists;
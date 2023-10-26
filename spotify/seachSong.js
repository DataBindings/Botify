import querystring from "node:querystring";

/**
 * Asynchronous function to search for songs on the Spotify platform using the Spotify Web API.
 *
 * @param {string} token - The Spotify user authentication token (Bearer token) required for API access.
 * @param {string} track - The name of the song to search for.
 * @param {string} artist - The name of the artist associated with the song.
 * @param {string} type - (Optional) The type of search query (e.g., 'track', 'album', 'artist'). Defaults to 'track'.
 * @param {string} limit - (Optional) The maximum number of search results to return. Defaults to '10'.
 * @param {string} offset - (Optional) The index of the first search result to return. Defaults to '0'.
 *
 * @throws {Error} If there are errors during the API request, this function throws different error messages based on the scenario:
 *   - "Failed to search Spotify songs: Only valid bearer authentication supported" (Status 400): When the bearer authentication provided is invalid.
 *   - "Failed to search Spotify songs: Bad or expired token" (Status 401): When the access token is incorrect or has expired.
 *   - "Failed to search Spotify songs: Bad OAuth request" (Status 403): When the OAuth request is invalid.
 *   - "Failed to search Spotify songs: Rate limit exceeded" (Status 429): When the request rate limit has been exceeded.
 *   - "Failed to search Spotify songs: Unknown error" (Other status codes): For any other unexpected errors.
 * 
 * @returns {Promise} A Promise that resolves to the JSON response containing search results.
 */
const searchSong = async (token, track, artist, type = "track", limit = "10", offset = "0") => {
  // Construct the query parameters for the API request.
  const query = querystring.stringify({
    "q": `remastered + track: + ${track} + artist: ${artist}`,
    "type": type,
    "limit": limit,
    "offset": offset,
  });

  // Build the full URL for the Spotify search request.
  const url = `https://api.spotify.com/v1/search?${query}`;

  // Perform a GET request to the Spotify Web API with the provided access token.
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  // Check for errors in the API response and handle accordingly.
  if (!response.ok) {
    // Different error messages are thrown based on the response status code.
    if (response.status === 400) {
      throw new Error(`Failed to search Spotify songs: Only valid bearer authentication supported`);
    } else if (response.status === 401) {
      throw new Error("Failed to search Spotify songs: Bad or expired token");
    } else if (response.status === 403) {
      throw new Error("Failed to search Spotify songs: Bad OAuth request");
    } else if (response.status === 429) {
      throw new Error("Failed to search Spotify songs: exceeded rate limits");
    } else {
      throw new Error("Failed to search Spotify songs: Unknown error");
    }
  }

  // Parse the response data as JSON.
  const data = await response.json();

  // Return the JSON response data.
  return data;
}

export default searchSong;
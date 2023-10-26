import querystring from "node:querystring";
import 'dotenv/config';

/**
 * Retrieves a Spotify access token using a client's credentials and a refresh token.
 *
 * This function makes a POST request to the Spotify Accounts API to obtain a new access token
 * using the provided client ID, client secret, and refresh token. It handles errors and returns
 * the access token data if successful.
 *
 * @param {string} clientId - The client ID obtained from your Spotify developer dashboard.
 * @param {string} clientSecret - The client secret obtained from your Spotify developer dashboard.
 * @param {string} refreshToken - The refresh token associated with the user's Spotify account.
 *
 * @returns {Promise<Object>} A Promise that resolves to an object containing the access token data.
 * @throws {Error} Throws an error with an error message if the token retrieval fails.
 */
const getAccessToken = async (clientId, clientSecret, refreshToken) => {
  // Spotify Accounts API endpoint URL
  const url = `https://accounts.spotify.com/api/token`;

  // Create a Base64-encoded "Basic" authorization header
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  // Make an HTTP POST request to obtain a new access token
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: querystring.stringify({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  // Check for errors in the API response and handle accordingly.
  if (!response.ok) {
    // Different error messages are thrown based on the response status code.
    if (response.status === 400) {
      throw new Error("Failed to obtain Spotify access token: Invalid client id, secret, or refresh token");
    } else if (response.status === 429) {
      throw new Error("Failed to obtain Spotify access token: Rate limit exceeded");
    } else if (response.status >= 500) {
      throw new Error("Failed to obtain Spotify access token: Server error");
    } else {
      throw new Error("Failed to obtain Spotify access token: Unknown error");
    }
  }

  // Parse the response data as JSON.
  const responseData = await response.json();

  // Return the JSON response data.
  return responseData;
}

export default getAccessToken;
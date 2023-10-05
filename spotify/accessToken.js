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
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  });

  // Ensure the response is valid; otherwise, throw errors
  if (!response.ok && response.status !== 400) {
    throw new Error("Failed to retrieve Spotify access token: Network Error");
  }

  // Ensure the response is in JSON format and return the parsed JSON data
  const responseData = await response.json();

  // Handle specific error cases and throw errors with corresponding messages
  if (responseData.error_description === "Invalid client") {
    throw new Error("Failed to retrieve Spotify access token: incorrect client id");
  }

  if (responseData.error_description === "Invalid client secret") {
    throw new Error("Failed to retrieve Spotify access token: incorrect client secret");
  }

  if (responseData.error_description === "Invalid refresh token") {
    throw new Error("Failed to retrieve Spotify access token: incorrect refresh token");
  }

  return responseData;
}

export default getAccessToken;
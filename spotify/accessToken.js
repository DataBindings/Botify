import querystring from "node:querystring";
import 'dotenv/config';

/**
 * Retrieves a Spotify access token using the provided refresh token.
 *
 * This function sends a POST request to the Spotify Accounts service to obtain
 * an access token using the provided refresh token and client credentials.
 *
 * @async
 * @function  getAccessToken
 * @throws    {Error} If there's an issue with the network request or the response.
 * @returns   {Promise<object>} A Promise that resolves to an object containing the access token.
 */
const getAccessToken = async (clientId, clientSecret, refreshToken) => {
  try {

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

    // Ensure the response is in JSON format and return the parsed JSON data
    const responseData = await response.json();

    return responseData;
  } 
  catch (error) {
    throw new Error(`Failed to retrieve Spotify access token: ${error.message}`);
  }
};

export default getAccessToken;
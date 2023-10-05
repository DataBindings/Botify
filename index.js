import getAccessToken from "./spotify/accessToken.js";

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

// console.log(await getAccessToken(clientId, clientSecret, refreshToken));
await getAccessToken(clientId, clientSecret, refreshToken)
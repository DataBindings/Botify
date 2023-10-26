import getAccessToken from "../spotify/accessToken.js";
import getUserPlaylists from "../spotify/getUserPlaylists.js";

describe('GetUserPlaylistsSuccess', () => {
  it('should return playlist data when the request is successful', async () => {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;
    const { access_token } = await getAccessToken(clientId, clientSecret, refreshToken);
    const { items } = await getUserPlaylists(access_token, 10, 0);
    await expect(items.length).toEqual(expect.any(Number));
  });
});
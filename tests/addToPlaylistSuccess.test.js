import getAccessToken from "../spotify/accessToken.js";
import addToPlaylist from "../spotify/addToPlaylist.js"

describe('AddToPlaylistSuccess', () => {
  it('should return playlist data when the request is successful', async () => {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;
    const { access_token } = await getAccessToken(clientId, clientSecret, refreshToken);
    const mockResponseData = {
      snapshot_id: expect.any(String),
    };
    const result = await addToPlaylist(access_token, "6TSrT3TMaG6lJjwEKyboPt", "165cwz4wGlGz0uDBhxdKLY");
    expect(result).toEqual(expect.objectContaining(mockResponseData));
  });
});
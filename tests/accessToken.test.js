import fetchMock from "jest-fetch-mock";
import getAccessToken from "../spotify/accessToken.js";



describe("getAccessToken", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("should fetch an access token successfully", async () => {

    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

    const mockAccessTokenResponse = {
      access_token: expect.any(String),
      token_type: expect.any(String),
      expires_in: expect.any(Number),
      scope: expect.any(String)
    };

    fetchMock.mockResponse(JSON.stringify(mockAccessTokenResponse));

    const result = await getAccessToken(clientId, clientSecret, refreshToken);

    expect(result).toEqual(expect.objectContaining(mockAccessTokenResponse));
  });

  it("should throw an error for invalid client id", async () => {

    const clientId = 1;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

    await expect(getAccessToken(clientId, clientSecret, refreshToken)).rejects.toThrow(
      'Failed to retrieve Spotify access token: incorrect client id'
    );
  });

  it("should throw an error for invalid client secret", async () => {

    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = 1;
    const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

    await expect(getAccessToken(clientId, clientSecret, refreshToken)).rejects.toThrow(
      'Failed to retrieve Spotify access token: incorrect client secret'
    );
  });

  it("should throw an error for invalid refresh token", async () => {

    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const refreshToken = 1;

    await expect(getAccessToken(clientId, clientSecret, refreshToken)).rejects.toThrow(
      'Failed to retrieve Spotify access token: incorrect refresh token'
    );
  });
});
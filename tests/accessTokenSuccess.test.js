import getAccessToken from "../spotify/accessToken.js";

describe("GetAccessTokenSuccess", () => {
  it("should fetch an access token successfully", async () => {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;
    const mockResponseData = {
      access_token: expect.any(String),
      token_type: expect.any(String),
      expires_in: expect.any(Number),
      scope: expect.any(String)
    };
    const result = await getAccessToken(clientId, clientSecret, refreshToken);
    expect(result).toEqual(expect.objectContaining(mockResponseData));
  });
});
import fetchMock from "jest-fetch-mock";
import getAccessToken from "../spotify/accessToken.js";

fetchMock.enableMocks();

describe("GetAccessTokenFailure", () => {
  afterEach(() => {
    fetchMock.resetMocks();
  });

  it('should throw an error for an invalid client id, secret, or refresh token (400)', async () => {
    fetchMock.mockResponseOnce('', { status: 400 });
    await expect(() => getAccessToken('your-client-id', 'your-client-secret', 'your-refresh-token'))
      .rejects.toThrow('Failed to obtain Spotify access token: Invalid client id, secret, or refresh token');
  });

  it('should throw an error for insufficient permissions (403)', async () => {
    fetchMock.mockResponseOnce('', { status: 403 });
    await expect(() => getAccessToken('your-client-id', 'your-client-secret', 'your-refresh-token'))
      .rejects.toThrow('Failed to obtain Spotify access token: Unknown error');
  });

  it('should throw an error for rate limit exceeded (429)', async () => {
    fetchMock.mockResponseOnce('', { status: 429 });
    await expect(() => getAccessToken('your-client-id', 'your-client-secret', 'your-refresh-token'))
      .rejects.toThrow('Failed to obtain Spotify access token: Rate limit exceeded');
  });
  
  it('should throw an error for server error (500 and above)', async () => {
    fetchMock.mockResponseOnce('', { status: 500 });
    await expect(() => getAccessToken('your-client-id', 'your-client-secret', 'your-refresh-token'))
      .rejects.toThrow('Failed to obtain Spotify access token: Server error');
  });
});
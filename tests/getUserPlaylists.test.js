import fetchMock from "jest-fetch-mock";
import getAccessToken from "../spotify/accessToken.js";
import getUserPlaylists from "../spotify/getUserPlaylists.js";

fetchMock.enableMocks();

describe('getUserPlaylists', () => {
  afterEach(() => {
    fetchMock.resetMocks();
  });

  it('should return playlist data when the request is successful', async () => {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;
    const { access_token } = await getAccessToken(clientId, clientSecret, refreshToken);
    const { items } = await getUserPlaylists(access_token, 10, 0);
    await expect(items.length).toEqual(expect.any(Number));
  });

  it('should throw an error for an incorrect access token (401)', async () => {
    const mockToken = 'invalid-token';
    fetchMock.mockResponse('', { status: 401 });
    await expect(getUserPlaylists(mockToken)).rejects.toThrow(
      'Failed to list Spotify playlists: Incorrect access token'
    );
  });

  it('should throw an error for insufficient permissions (403)', async () => {
    const mockToken = 'insufficient-token';
    fetchMock.mockResponse('', { status: 403 });
    await expect(getUserPlaylists(mockToken)).rejects.toThrow(
      'Failed to list Spotify playlists: Insufficient permissions'
    );
  });

  it('should throw an error for user not found (404)', async () => {
    const mockToken = 'valid-token';
    fetchMock.mockResponse('', { status: 404 });
    await expect(getUserPlaylists(mockToken)).rejects.toThrow(
      'Failed to list Spotify playlists: User not found'
    );
  });

  it('should throw an error for rate limit exceeded (429)', async () => {
    const mockToken = 'valid-token';
    fetchMock.mockResponse('', { status: 429 });
    await expect(getUserPlaylists(mockToken)).rejects.toThrow(
      'Failed to list Spotify playlists: Rate limit exceeded'
    );
  });

  it('should throw an error for server error (500 and above)', async () => {
    const mockToken = 'valid-token';
    fetchMock.mockResponse('', { status: 500 });
    await expect(getUserPlaylists(mockToken)).rejects.toThrow(
      'Failed to list Spotify playlists: Server error'
    );
  });
});

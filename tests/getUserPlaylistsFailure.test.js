import fetchMock from "jest-fetch-mock";
import getUserPlaylists from "../spotify/getUserPlaylists.js";

fetchMock.enableMocks();

describe('GetUserPlaylistsFailure', () => {
  afterEach(() => {
    fetchMock.resetMocks();
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
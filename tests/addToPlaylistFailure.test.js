import fetchMock from "jest-fetch-mock";
import addToPlaylist from "../spotify/addToPlaylist.js"

fetchMock.enableMocks();

describe('AddToPlaylistFailure', () => {

  afterEach(() => {
    fetchMock.resetMocks();
  });

  it('should throw an error for an incorrect access token (401)', async () => {
    fetchMock.mockResponse('', { status: 401 });
    await expect(addToPlaylist('invalid-access-token', 'your-playlist-id', 'your-track-uri')).rejects.toThrow(
      'Failed to add to Spotify playlist: Incorrect access token'
    );
  });

  it('should throw an error for insufficient permissions (403)', async () => {
    fetchMock.mockResponse('', { status: 403 });
    await expect(addToPlaylist('invalid-access-token', 'your-playlist-id', 'your-track-uri')).rejects.toThrow(
      'Failed to add to Spotify playlist: Bad OAuth request'
    );
  });


  it('should throw an error for rate limit exceeded (429)', async () => {
    fetchMock.mockResponse('', { status: 429 });
    await expect(addToPlaylist('invalid-access-token', 'your-playlist-id', 'your-track-uri')).rejects.toThrow(
      'Failed to add to Spotify playlist: Rate limit exceeded'
    );
  });

  it('should throw an error for server error (500 and above)', async () => {
    fetchMock.mockResponse('', { status: 500 });
    await expect(addToPlaylist('invalid-access-token', 'your-playlist-id', 'your-track-uri')).rejects.toThrow(
      'Failed to add to Spotify playlist: Server error'
    );
  });
});
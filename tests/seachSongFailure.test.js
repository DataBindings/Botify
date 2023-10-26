import fetchMock from "jest-fetch-mock";
import searchSong from "../spotify/seachSong.js";

fetchMock.enableMocks();

describe('SearchSongFailure', () => {
  afterEach(() => {
    fetchMock.resetMocks();
  });

  it('should return search results when the request is successful', async () => {
    const mockResponseData = { /* Your mock response data here */ };
    fetchMock.mockResponse(JSON.stringify(mockResponseData), { status: 200 });
    const searchResults = await searchSong('valid-token', 'song-name', 'artist-name');
    expect(searchResults).toEqual(mockResponseData);
  });

  it('should throw an error for an incorrect access token (401)', async () => {
    const mockToken = 'invalid-token';
    fetchMock.mockResponse('', { status: 401 });
    await expect(searchSong(mockToken, 'song-name', 'artist-name')).rejects.toThrow(
      'Failed to search Spotify songs: Bad or expired token'
    );
  });

  it('should throw an error for insufficient permissions (403)', async () => {
    const mockToken = 'insufficient-token';
    fetchMock.mockResponse('', { status: 403 });
    await expect(searchSong(mockToken, 'song-name', 'artist-name')).rejects.toThrow(
      'Failed to search Spotify songs: Bad OAuth request'
    );
  });

  it('should throw an error for rate limit exceeded (429)', async () => {
    const mockToken = 'valid-token';
    fetchMock.mockResponse('', { status: 429 });
    await expect(searchSong(mockToken, 'song-name', 'artist-name')).rejects.toThrow(
      'Failed to search Spotify songs: exceeded rate limits'
    );
  });

  it('should throw an error for server error (500 and above)', async () => {
    const mockToken = 'valid-token';
    fetchMock.mockResponse('', { status: 500 });
    await expect(searchSong(mockToken, 'song-name', 'artist-name')).rejects.toThrow(
      'Failed to search Spotify songs: Unknown error'
    );
  });
});
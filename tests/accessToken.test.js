import fetchMock from "jest-fetch-mock";
import getAccessToken from "../spotify/accessToken.js";

describe("getAccessToken", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("should fetch an access token successfully", async () => {

    const mockAccessTokenResponse = {
      access_token: expect.any(String),
      token_type: expect.any(String),
      expires_in: expect.any(Number),
      scope: expect.any(String)
    };

    fetchMock.mockResponse(JSON.stringify(mockAccessTokenResponse));

    const result = await getAccessToken();

    expect(result).toEqual(expect.objectContaining(mockAccessTokenResponse));
  });
});
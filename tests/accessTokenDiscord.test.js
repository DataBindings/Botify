import fetchMock from "jest-fetch-mock";
import getDiscordToken from "../discord/accessToken.js";
import dotenv from "dotenv";
dotenv.config();


describe("getAccessToken", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("should fetch an access token successfully", async () => {

    const discordToken = process.env.DISCORD_TOKEN;

    const mockAccessTokenResponse = process.env.DISCORD_TOKEN;

    fetchMock.mockResponse(mockAccessTokenResponse);

    const client = await getDiscordToken(discordToken);

    expect(client.token).toEqual(mockAccessTokenResponse);

    client.destroy();
  });
});
import getDiscordToken from "../discord/accessToken.js";

describe("GetAccessTokenSuccess", () => {
  it("should fetch an access token successfully", async () => {
    const discordToken = process.env.DISCORD_TOKEN;
    const mockAccessTokenResponse = process.env.DISCORD_TOKEN;
    const client = await getDiscordToken(discordToken);
    expect(client.token).toEqual(mockAccessTokenResponse);
    client.destroy();
  });
});
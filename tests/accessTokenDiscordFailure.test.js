import getDiscordToken from "../discord/accessToken.js";

describe("GetAccessTokenFailure", () => {
  it("should throw an error for invalid discord token", async () => {
    const discordToken = 1;
    await expect(getDiscordToken(discordToken)).rejects.toThrow(
      "Failed to retrieve Discord access token: incorrect token provided"
    );
  });
});
import { Client, Events, GatewayIntentBits } from "discord.js";

/**
 * Retrieves a Discord bot token and logs in to the Discord API using the provided token.
 *
 * @async
 * @param {string} discordToken - The Discord bot token to use for logging in.
 * @returns {Promise<Client>} A Promise that resolves to a Discord.js Client instance upon successful login.
 * @throws {Error} Throws an error if there's an issue with the provided token.
 */
const getDiscordToken = async (discordToken) => {
  // Create a new Discord.js Client instance with specific intents.
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
  });

  // Listen for the 'ClientReady' event and log when the bot is ready.
  client.once(Events.ClientReady, (c) => console.log(`Botify Running! Logged in as ${c.user.tag}`));

  try {
    // Attempt to log in to the Discord API using the provided token.
    await client.login(discordToken);
  } catch (error) {
    // Handle errors related to invalid tokens.
    if (error.code === 'TokenInvalid') {
      throw new Error("Failed to retrieve Discord access token: incorrect token provided");
    }
  }

  // Return the Discord.js Client instance after successful login.
  return client;
};

export default getDiscordToken;
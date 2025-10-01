require('dotenv').config();
const { Client, GatewayIntentBits } = require("discord.js");

const TARGET_CHANNEL_ID = process.env.TARGET_CHANNEL_ID;
const TOKEN = process.env.DISCORD_TOKEN;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", () => {
  console.log(`Bot online as ${client.user.tag}`);
});
client.on("messageCreate", async (message) => {
  // Ignore bot messages
  if (message.author.bot) return;

  // Only act in target channel
  if (message.channel.id === TARGET_CHANNEL_ID) {
    // Check if it's a reply
    if (message.reference) {
      try {
        // Send a warning message mentioning the user
        const warning = await message.channel.send({
          content: `${message.author}, That isn't only h!`,
        });

        // Delete the user's reply
        await message.delete();

        // Delete the bot's warning after 5 seconds
        setTimeout(async () => {
          try {
            await warning.delete();
          } catch (err) {
            console.error("❌ Failed to delete warning:", err);
          }
        }, 15000);

        console.log(`🗑️ Deleted a reply and warned ${message.author.tag}`);
      } catch (err) {
        console.error("❌ Error handling reply:", err);
      }
    }
  }
});

client.login(TOKEN);

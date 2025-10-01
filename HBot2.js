const { Client, GatewayIntentBits } = require("discord.js");

// Replace with your channel ID
const TARGET_CHANNEL_ID = "1147717751901790218";

// Replace with your bot token
const TOKEN = "MTQyMjczNTQ0OTcwNDc1OTQwOA.Gu8iWu.HSuaonZ9ibdXwRliEEB8eC_r02CjfOMWaAEU7w";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", () => {
  console.log(`✅ Bot is online as ${client.user.tag}`);
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

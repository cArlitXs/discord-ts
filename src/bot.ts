import { config } from "dotenv";
config();

import { Client, Message, GuildMember } from "discord.js";
import { prefix } from "./config.json";

const client: Client = new Client();

client.on("ready", () => {
  console.log("BOT is ready!");
});

client.on("message", async (message: Message) => {
  console.log(message.content);

  if (message.content.startsWith(`${prefix}ping`)) {
    // message.channel.send("🚀 pong");
    message.reply("🚀 pong");
  }

  if (message.content.startsWith(`${prefix}kick`)) {
    if (message.member.hasPermission(["KICK_MEMBERS"])) {
      const member = message.mentions.members.first();
      if (member) {
        const kickMember = await member.kick();
        console.log(kickMember.user.username);
        message.channel.send(`${kickMember.user.username} has been kicked`);
      }
    } else {
      message.reply("You need permisions to do this");
    }
  }

  if (message.content.startsWith(`${prefix}deletemessages`)) {
    try {
      const messages = await message.channel.fetchMessages();
      await message.channel.bulkDelete(messages);
    } catch (error) {
      console.log(error);
    }
  }
});

client.login(process.env.DISCORD_TOKEN);

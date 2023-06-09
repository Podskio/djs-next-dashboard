import { SlashCommandBuilder, inlineCode } from "discord.js";
import { type CommandExecution } from "../types";

export const execution: CommandExecution = (_, interaction) => {
  const ping = `${Date.now() - interaction.createdTimestamp}ms`;

  interaction.reply({
    content: `🏓 Pong! ${inlineCode(ping)}`,
  });
};

export const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Pings the bot and returns response time.");

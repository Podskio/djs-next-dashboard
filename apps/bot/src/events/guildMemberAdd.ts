import { EmbedBuilder, type GuildMember } from "discord.js";
import { prisma } from "../db";
import { type EventExecution } from "../types";

export const execution: EventExecution = async (_, member: GuildMember) => {
  const guild = member.guild;

  const guildData = await prisma.guild.findUnique({
    where: {
      id: guild.id,
    },
  });

  if (!guildData || !guildData.welcomeMessage) return;

  const embed = new EmbedBuilder()
    .setColor("Green")
    .setDescription(guildData.welcomeMessage);

  guild.systemChannel?.send({
    content: member.toString(),
    embeds: [embed],
  });
};

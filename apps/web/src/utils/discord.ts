import { env } from "~/env.mjs";
import { getBaseUrl } from "./api";

export const DISCORD_ENDPOINT = "https://discord.com/api/v10";

export interface Guild {
  id: string;
  name: string;
  icon: string | null;
  owner: boolean;
  permissions: string;
}

// https://discord.com/developers/docs/reference#image-formatting
export const getGuildIconUrl = (guild: Guild) => {
  if (!guild.icon) return null;

  const format = guild.icon.startsWith("a_") ? "gif" : "png";
  return `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.${format}`;
};

export const buildInviteUrl = (guildId: string) =>
  `https://discord.com/api/oauth2/authorize?client_id=${
    env.DISCORD_CLIENT_ID
  }&scope=bot%20applications.commands&guild_id=${guildId}&response_type=code&redirect_uri=${encodeURIComponent(
    `${getBaseUrl()}/guilds`,
  )}`;

export const getGuild = async (guildId: string) => {
  const guild = await fetch(`${DISCORD_ENDPOINT}/guilds/${guildId}`, {
    headers: {
      Authorization: `Bot ${env.DISCORD_BOT_TOKEN}`,
    },
  });

  if (guild.status !== 200) return null;

  const guildData = (await guild.json()) as Guild;
  guildData.icon = getGuildIconUrl(guildData);

  return guildData;
};

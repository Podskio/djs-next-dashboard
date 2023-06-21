import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { getAccessTokenFromRequest } from "~/server/auth";
import { DISCORD_ENDPOINT, getGuildIconUrl, type Guild } from "~/utils/discord";

export const discordRouter = createTRPCRouter({
  getGuildData: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.guild.findUnique({
        where: {
          id: input,
        },
      });
    }),

  setGuildData: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        welcomeMessage: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.guild.upsert({
        where: {
          id: input.id,
        },
        create: {
          id: input.id,
          welcomeMessage: input.welcomeMessage,
        },
        update: {
          welcomeMessage: input.welcomeMessage,
        },
      });
    }),

  getGuilds: protectedProcedure.query(async ({ ctx }) => {
    const accessToken = await getAccessTokenFromRequest(ctx.req);

    const guilds = await fetch(`${DISCORD_ENDPOINT}/users/@me/guilds`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (guilds.status !== 200) throw new Error("Failed to fetch guilds");

    const guildsData = (await guilds.json()) as Guild[];

    guildsData.forEach((guild) => {
      guild.icon = getGuildIconUrl(guild);
    });

    return guildsData;
  }),
});

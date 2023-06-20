import { discordRouter } from "~/server/api/routers/discord";
import { createTRPCRouter } from "~/server/api/trpc";

export const appRouter = createTRPCRouter({
  discord: discordRouter,
});

export type AppRouter = typeof appRouter;

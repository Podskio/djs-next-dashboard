# Discord.js + Next.js Bot Dashboard Template

Basic example of a Discord bot dashboard using Next.js. Allows a user to sign in with Discord, select a server they own or can manage, and configure guild-specific bot settings. In addition, the site prompts the user to add the bot to the server if it is not already present.

This project is a monorepo that contains a web app as well as a Discord.js server which are designed to communicate asynchronously through a database.

Built with the [Create T3 App](https://create.t3.gg) stack. Includes a shared [Prisma](https://prisma.io) schema between apps.

## Dev Setup

1. Create your own repo from the template and clone to your machine
2. Run `pnpm install`
3. [Create a Discord application](https://discord.com/developers/applications) and retrieve the client id, secret, and bot token
   - Ensure you add OAuth redirects for your environments, both to `/api/auth/callback/discord` and `/guilds`
4. Create a instance of your preferred Prisma-supported database and configure both the [Prisma schema](./packages/database/prisma/schema.prisma) and [database env variable](./packages/database/.env) appropriately
5. In `packages/database`, run `pnpm prisma db push` and `pnpm generate` to initialize the database and Prisma client
6. Configure environment variables for both apps, referencing the respective `.env.example`
7. Run `pnpm dev`

## Deployment

The web dashboard is intended to be deployed on [Vercel](https://vercel.com). If you do not use Vercel to host the web app, ensure you modify `getBaseUrl` in [api.ts](./apps/web/src/utils/api.ts) appropriately.

The Discord.js server can be hosted on any platform that supports Node apps.

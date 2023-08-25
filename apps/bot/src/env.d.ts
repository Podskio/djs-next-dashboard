import { z } from "zod";

const env = z.object({
  DISCORD_CLIENT_ID: z.string().min(1),
  DISCORD_BOT_TOKEN: z.string().min(1),
});

env.parse(process.env);

declare global {
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface ProcessEnv extends z.infer<typeof env> {}
  }
}

import { Client, GatewayIntentBits } from "discord.js";
import "dotenv/config";
import { readdirSync } from "fs";
import path from "path";
import type { EventExecution } from "./types";

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

client.once("ready", () => {
  console.log(`🤖 ${client.user!.tag} is online`);
});

const eventDirectory = __dirname + "/events";

readdirSync(eventDirectory)
  .filter((f) => f.slice(-3) === ".js" || f.slice(-3) === ".ts")
  .map((f) => {
    const eventName = f.split(".")[0];

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const event = require(path.join(eventDirectory, f));
    const eventExecution = event.execution as EventExecution;

    client.on(eventName, eventExecution.bind(null, client));
  });

client.login(process.env.DISCORD_BOT_TOKEN);

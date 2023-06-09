import { type Client, type CommandInteraction } from "discord.js";

export interface EventExecution {
  (client: Client, ...args: any[]): void;
}

export interface CommandExecution {
  (client: Client, interaction: CommandInteraction): void;
}

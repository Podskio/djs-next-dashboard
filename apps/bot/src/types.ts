import { type Client, type CommandInteraction } from "discord.js";

export interface EventExecution {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (client: Client, ...args: any[]): void;
}

export interface InteractionExecution<T = CommandInteraction> {
  (interaction: T): void;
}

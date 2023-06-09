import { type BaseInteraction } from "discord.js";
import { readdirSync } from "fs";
import path from "path";
import { type CommandExecution, type EventExecution } from "../types";

const commandDirectory = __dirname + "/../commands";

const commands: { [key: string]: CommandExecution } = {};

readdirSync(commandDirectory)
  .filter((f) => f.slice(-3) === ".js" || f.slice(-3) === ".ts")
  .map((f) => {
    const commandName = f.split(".")[0];

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const command = require(path.join(commandDirectory, f));
    const commandExecution = command.execution as CommandExecution;

    commands[commandName] = commandExecution;
  });

const unimplemented = (interaction: BaseInteraction) => {
  if (interaction.isRepliable())
    return interaction.reply({
      content: "This interaction is not implemented.",
    });
};

export const execution: EventExecution = (
  client,
  interaction: BaseInteraction,
) => {
  if (interaction.isChatInputCommand()) {
    if (!commands[interaction.commandName]) return unimplemented(interaction);

    commands[interaction.commandName](client, interaction);
  } else unimplemented(interaction);
};

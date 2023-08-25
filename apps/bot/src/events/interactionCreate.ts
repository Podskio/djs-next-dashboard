import type { ButtonInteraction, CommandInteraction } from "discord.js";
import { type BaseInteraction } from "discord.js";
import { existsSync, readdirSync } from "fs";
import path from "path";
import { type EventExecution, type InteractionExecution } from "../types";

const interactionTypes = [
  {
    interactionType: "commands",
    validator: (i: BaseInteraction) =>
      i.isChatInputCommand() || i.isContextMenuCommand(),
    getId: (i: CommandInteraction) => i.commandName,
  },
  {
    interactionType: "buttons",
    validator: (i: BaseInteraction) => i.isButton(),
    getId: (i: ButtonInteraction) => i.customId,
  },
  {
    interactionType: "menus",
    validator: (i: BaseInteraction) => i.isAnySelectMenu(),
    getId: (i: ButtonInteraction) => i.customId,
  },
  {
    interactionType: "modals",
    validator: (i: BaseInteraction) => i.isModalSubmit(),
    getId: (i: ButtonInteraction) => i.customId,
  },
];

const interactions = new Map<string, InteractionExecution<BaseInteraction>>();
const interactionPath = "../interactions";

for (const { interactionType } of interactionTypes) {
  // If there are no interactions in the folder, it will not appear in the build, so check if it exists.
  if (!existsSync(path.join(__dirname, interactionPath, interactionType)))
    continue;

  readdirSync(path.join(__dirname, interactionPath, interactionType))
    .filter((f) => f.slice(-3) === ".js" || f.slice(-3) === ".ts")
    .forEach((f) => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const interaction = require(path.join(
        __dirname,
        interactionPath,
        interactionType,
        f,
      ));
      const interactionExecution = interaction.execution;
      if (!interactionExecution) return;

      interactions.set(
        `${interactionType}_${f.split(".")[0]}`,
        interactionExecution,
      );
    });
}

export const execution: EventExecution = (_, interaction: BaseInteraction) => {
  for (const { interactionType, validator, getId } of interactionTypes) {
    if (!validator(interaction)) continue;

    const id = getId(interaction as never);

    const interactionExecution = interactions.get(`${interactionType}_${id}`);
    if (interactionExecution) return interactionExecution(interaction);

    if (interaction.isRepliable())
      return interaction.reply({
        content: "This interaction is not implemented.",
        ephemeral: true,
      });
  }
};

import { type GetServerSideProps } from "next";
import { useState } from "react";
import Header from "~/components/Header";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/utils/api";
import { buildInviteUrl, getGuild, type Guild } from "~/utils/discord";
import { GuildIcon } from ".";

const GuildPage = ({ guild }: { guild: Guild }) => {
  const { data: guildData } = api.discord.getGuildData.useQuery(guild.id, {
    refetchOnWindowFocus: false,
  });
  const setGuildData = api.discord.setGuildData.useMutation();

  const [welcomeMessage, setWelcomeMessage] = useState(
    guildData?.welcomeMessage || "",
  );

  return (
    <>
      <Header />

      <div className="flex w-full items-center gap-4 rounded bg-gray-800 px-4 py-4">
        <GuildIcon guild={guild} size={60} />

        <h1 className="text-2xl text-gray-300">{guild.name}</h1>
      </div>

      <div className="w-full rounded bg-gray-800 px-4 py-4">
        <label className="text-gray-300">Welcome Message</label>
        <textarea
          className="mt-2 w-full rounded bg-gray-700 px-4 py-2 text-gray-300"
          placeholder="Welcome to the server!"
          value={welcomeMessage}
          onChange={(e) => setWelcomeMessage(e.target.value)}
        />
        <button
          onClick={() => setGuildData.mutate({ id: guild.id, welcomeMessage })}
          disabled={setGuildData.isLoading}
          className="mt-2 rounded bg-green-700 px-4 py-2 font-semibold text-white hover:bg-opacity-75 disabled:bg-opacity-75 disabled:text-gray-400"
        >
          Save
        </button>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerAuthSession(context);

  if (!session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  const { id } = context.params as { id: string };
  const guild = await getGuild(id);

  // If guild response is null, the bot is not in the guild, prompt user to invite
  if (!guild) {
    return {
      redirect: {
        destination: buildInviteUrl(id),
        permanent: false,
      },
    };
  }

  return { props: { guild } };
};

export default GuildPage;

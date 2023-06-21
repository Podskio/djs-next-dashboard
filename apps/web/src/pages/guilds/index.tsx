import { type GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "~/components/Header";
import Tooltip from "~/components/Tooltip";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/utils/api";
import { type Guild } from "~/utils/discord";

const GuildButton = (guild: Guild) => (
  <div className="w-20 overflow-clip rounded-[3rem] shadow transition-all duration-200 hover:rounded-3xl">
    <Link href={`/guilds/${guild.id}`}>
      <Image height={80} width={80} src={guild.icon} alt="guild icon" />
    </Link>
  </div>
);

const Index = () => {
  const { data: guilds } = api.discord.getGuilds.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <Header />

      <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
        {!!guilds ? (
          guilds
            // Only show servers that you own or can manage
            // https://discord.com/developers/docs/topics/permissions#permissions-bitwise-permission-flags
            .filter((g) => parseInt(g.permissions) & 0x20)
            .sort((g) => (g.owner ? 0 : 1))
            .map((guild) => (
              <Tooltip label={guild.name} key={guild.id}>
                <GuildButton {...guild} />
              </Tooltip>
            ))
        ) : (
          <p>Loading...</p>
        )}
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

  // If redirecting from adding the bot, redirect to that guild
  const { guild_id } = context.query as { guild_id?: string };
  if (guild_id) {
    return {
      redirect: {
        destination: `/guilds/${guild_id}`,
        permanent: false,
      },
    };
  }

  return { props: {} };
};

export default Index;

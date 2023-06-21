import { type GetServerSideProps, type NextPage } from "next";
import { signIn } from "next-auth/react";
import Header from "~/components/Header";
import { getServerAuthSession } from "~/server/auth";

const Index: NextPage = () => {
  return (
    <>
      <Header />

      <button
        onClick={() => void signIn("discord")}
        className="duration rounded bg-[#7289DA] px-4 py-2 font-semibold hover:bg-opacity-75"
      >
        Sign In with Discord
      </button>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerAuthSession(context);

  if (session)
    return {
      redirect: {
        destination: "/guilds",
        permanent: false,
      },
    };

  return { props: {} };
};

export default Index;

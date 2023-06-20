import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Header = () => {
  const { data: session } = useSession();

  return (
    <div className="flex w-full items-center justify-between rounded bg-gray-800 px-4 py-2">
      <Link href="/guilds">
        <p className="text-2xl">🤖</p>
      </Link>
      {!!session && (
        <button
          onClick={() => void signOut()}
          className="rounded bg-[#7289DA] px-4 py-2 font-semibold hover:bg-opacity-75"
        >
          Sign Out
        </button>
      )}
    </div>
  );
};

export default Header;

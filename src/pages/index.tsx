import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "../utils/api";
import { navigation } from "../utils/const";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Tools</title>
        <meta name="description" content="A collection of web development tools" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl text-center font-extrabold tracking-tight text-white sm:text-[5rem]">
            <span className="text-[hsl(280,100%,70%)]">Tools</span>
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {navigation.filter(i => i.href !== '/').map((item, idx) => (
              <Link
              key={idx}
                className="flex max-w-md flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
                href={item.href}
              >
                <h3 className="text-2xl font-bold">{item.name} →</h3>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

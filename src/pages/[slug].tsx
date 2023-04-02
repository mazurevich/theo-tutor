import Head from "next/head";
import { type GetStaticProps, type NextPage } from "next";
import superjson from "superjson";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { type SignedOutAuthObject } from "@clerk/backend";

import { api } from "@/utils/api";
import { appRouter } from "@/server/api/root";
import { prisma } from "@/server/db";
import { Layout } from "@/components/layout";
import Image from "next/image";

const PICK_SIZE = 128;

const ProfilePage: NextPage<{ username: string }> = ({ username }) => {
  const { data } = api.profile.getUserByUsername.useQuery({
    username,
  });

  if (!data) {
    return <div>404 User not found</div>;
  }
  const { profileImageUrl, username: _username, email } = data;
  return (
    <>
      <Head>
        <title>{_username}</title>
      </Head>
      <Layout>
        <div className="border-slatee-400 relative h-48 bg-slate-400">
          <Image
            className="absolute bottom-0 left-4 translate-y-[50%] rounded-full border-4 border-black bg-black"
            src={profileImageUrl}
            alt={`${_username ?? "Users"}'s profile picture`}
            width={PICK_SIZE}
            height={PICK_SIZE}
          />
        </div>
        <div className="h-16" />
        <div className="p-6 text-2xl font-bold">@{_username}</div>
        <div className="border-b border-slate-400 "> </div>
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: { prisma, auth: {} as SignedOutAuthObject },
    transformer: superjson, // optional - adds superjson serialization
  });

  const slug = context.params?.slug;

  if (typeof slug !== "string") {
    return {
      redirect: {
        destination: "/",
      },
      props: {},
    };
  }

  const username = slug.replace("@", "");

  await ssg.profile.getUserByUsername.prefetch({ username });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      username,
    },
  };
};

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default ProfilePage;

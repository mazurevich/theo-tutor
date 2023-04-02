import Head from "next/head";
import { type FC } from "react";
import { type GetStaticProps, type NextPage } from "next";
import Image from "next/image";
import { api } from "@/utils/api";
import { Layout } from "@/components/layout";
import { LoadingPage } from "@/components/loading-page";
import { PostsList } from "@/components/posts-list";
import { type PostWithUser } from "@/types";
import { generateSSGHelper } from "@/server/helpers/ssg-helper";

const PICK_SIZE = 128;

type UsersFeedProps = {
  userData: PostWithUser["author"];
};
const UserFeed: FC<UsersFeedProps> = ({ userData }) => {
  const { data, isLoading } = api.posts.getPostsByUser.useQuery({
    userId: userData.id,
  });

  if (isLoading) {
    return <LoadingPage />;
  }
  if (!data) {
    return <div>{`This user didn't post anything`}</div>;
  }

  return <PostsList posts={data} />;
};

const ProfilePage: NextPage<{ username: string }> = ({ username }) => {
  const { data } = api.profile.getUserByUsername.useQuery({
    username,
  });

  if (!data) {
    return <div>404 User not found</div>;
  }
  const { profileImageUrl, username: _username } = data;
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
        <UserFeed userData={data} />
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();
  const postId = context.params?.postId;

  if (typeof postId !== "string") {
    return {
      redirect: {
        destination: "/",
      },
      props: {},
    };
  }

  const username = postId.replace("@", "");

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

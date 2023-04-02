import { type NextPage } from "next";
import Head from "next/head";

import { api, type RouterOutputs } from "@/utils/api";
import { SignInButton, useUser } from "@clerk/nextjs";
import { CreatePostWizard, Loader } from "@/components";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import { LoadingPage } from "@/components/loading-page";
import Link from "next/link";

dayjs.extend(relativeTime);

type PostWithUser = RouterOutputs["posts"]["getAll"][0];
const PostView = (props: PostWithUser) => {
  const { post, author } = props;
  return (
    <div className="border-stale-400 flex gap-3 border-b py-8 px-4">
      <Image
        src={author.profileImageUrl}
        alt="user profile image"
        className="h-14 w-14 rounded-full"
        width={56}
        height={56}
      />

      <div className="flex flex-col">
        <div className="flex text-slate-300">
          <span>
            <Link href={`@${author.username}`}>{`@${author.username}`}</Link>
          </span>
          <span>
            <Link href={`/post/${post.id}`}>
              &nbsp;{` · ${dayjs(post.createdAt).fromNow()}`}
            </Link>
          </span>
        </div>
        <span className="h-full grow align-middle text-2xl">
          {post.content}
        </span>
      </div>
    </div>
  );
};

const Feed = () => {
  const { data, isLoading: isPostsLoading } = api.posts.getAll.useQuery();

  if (isPostsLoading) {
    return <LoadingPage size={40} />;
  }

  if (!data) {
    return <div>Not tweets for today</div>;
  }

  return (
    <div className="flex flex-col ">
      {data.map(({ post, author }) => {
        return <PostView key={post.id} post={post} author={author} />;
      })}
    </div>
  );
};

const Home: NextPage = () => {
  const { isSignedIn, isLoaded: isUserLoaded } = useUser();

  if (!isUserLoaded) {
    return <div></div>;
  }

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="mx-2 flex h-screen justify-center ">
        <div className="h-full w-full border-x border-slate-400 md:max-w-2xl">
          <div className="flex border-b border-slate-400 p-4">
            {!isSignedIn && <SignInButton />}
            {isSignedIn && <CreatePostWizard />}
          </div>
          <Feed />
        </div>
      </main>
    </>
  );
};

export default Home;

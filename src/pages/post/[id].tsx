import { type GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import { Layout } from "@/components/layout";
import { generateSSGHelper } from "@/server/helpers/ssg-helper";
import { api } from "@/utils/api";
import { PostView } from "@/components";

const SinglePostPage: NextPage<{ id: string }> = ({ id }) => {
  const { data } = api.posts.getById.useQuery({ id });

  if (!data) {
    return <div>404 Post not found</div>;
  }

  return (
    <>
      <Head>
        <title>{`${data.post.content} - @${data.author.username}`}</title>
        <meta name=" description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <PostView post={data?.post} author={data?.author} />
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();
  const id = context.params?.id;
  if (typeof id !== "string") {
    return {
      redirect: {
        destination: "/",
      },
      props: {},
    };
  }

  await ssg.posts.getById.prefetch({ id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
};

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default SinglePostPage;

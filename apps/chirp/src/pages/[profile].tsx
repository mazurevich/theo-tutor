import Head from "next/head";
import { type FC, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { type GetStaticProps, type NextPage } from "next";
import Image from "next/image";
import { api } from "@/utils/api";
import { Layout } from "@/components/layout";
import { LoadingPage } from "@/components/loading-page";
import { PostsList } from "@/components/posts-list";
import { type PostWithUser } from "@/types";
import { generateSSGHelper } from "@/server/helpers/ssg-helper";
import { Button, IconButton } from "ui";
import { PencilSquare, Check, XCircle } from "ui/src/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/router";
import { Loader } from "@/components";

const validationSchema = z.object({
  username: z.string().min(1, "Username is too short"),
});

type ValidationSchema = z.infer<typeof validationSchema>;

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
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const router = useRouter();

  const ctx = api.useContext();

  const [isEditing, setIsEditing] = useState(false);

  const { data } = api.profile.getUserByUsername.useQuery(
    {
      username,
    },
    {
      cacheTime: 60 * 60 * 1000,
      staleTime: 5 * 60 * 1000,
    }
  );
  const { mutate: updateProfile, isLoading: isUpdating } =
    api.profile.updateProfile.useMutation({
      onSuccess: async (user) => {
        void router.replace(`/[profile]`, `/@${user.username}`);
        void ctx.posts.getPostsByUser.invalidate({ userId: data?.id });
        await ctx.profile.getUserByUsername.invalidate();
        setIsEditing(false);
        reset();
      },
    });
  const onSubmit: SubmitHandler<ValidationSchema> = (formData) => {
    if (!data) {
      return;
    }
    updateProfile({
      id: data.id,
      username: formData.username,
    });
  };

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
        {isEditing ? (
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative mb-2 flex items-center">
              <input
                type="text"
                {...register("username")}
                className="mx-2 my-4 border-b border-slate-400 bg-transparent px-4 py-2 text-2xl font-bold text-slate-50 focus:outline-none disabled:text-slate-500"
                defaultValue={_username}
                disabled={isUpdating}
              />
              {errors.username && (
                <div className="absolute bottom-0 px-6 pt-1 text-sm text-red-500">
                  {errors.username.message}
                </div>
              )}
              {isUpdating ? (
                <Loader size={16} />
              ) : (
                <>
                  <IconButton
                    icon={<Check />}
                    type="submit"
                    className="text-slate-50 hover:text-slate-200"
                  />
                  <IconButton
                    icon={<XCircle />}
                    className="text-slate-50 hover:text-slate-200"
                    onClick={() => setIsEditing(false)}
                  />
                </>
              )}
            </div>
          </form>
        ) : (
          <div className="flex items-center">
            <div className="p-6 text-2xl font-bold">@{_username}</div>
            <IconButton
              icon={<PencilSquare />}
              className="text-slate-50 hover:text-slate-200"
              onClick={() => setIsEditing(true)}
            />
          </div>
        )}
        <div className="border-b border-slate-400 "> </div>
        <UserFeed userData={data} />
      </Layout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();
  const profile = context.params?.profile;

  if (typeof profile !== "string") {
    return {
      redirect: {
        destination: "/",
      },
      props: {},
    };
  }

  const username = profile.replace("@", "");

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

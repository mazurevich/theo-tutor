import { api } from "@/utils/api";
import { LoadingPage } from "@/components/loading-page";
import { PostsList } from "@/components/posts-list";

export const CommonFeed = () => {
  const { data, isLoading: isPostsLoading } = api.posts.getAll.useQuery();

  if (isPostsLoading) {
    return <LoadingPage size={40} />;
  }

  if (!data) {
    return <div>Not tweets for today</div>;
  }

  return <PostsList posts={data} />;
};

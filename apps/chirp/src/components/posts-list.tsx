import { PostView } from "@/components/post-view";
import { type PostWithUser } from "@/types";
import { type FC } from "react";

type PostsListProps = {
  posts: PostWithUser[];
};

export const PostsList: FC<PostsListProps> = ({ posts }) => {
  return (
    <div className="flex flex-col ">
      {posts.map(({ post, author }) => {
        return <PostView key={post.id} post={post} author={author} />;
      })}
    </div>
  );
};

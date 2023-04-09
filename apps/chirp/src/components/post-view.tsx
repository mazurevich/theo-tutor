import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import { type PostWithUser } from "@/types";
import relativeTime from "dayjs/plugin/relativeTime";
import { UserAvatar } from "ui";

dayjs.extend(relativeTime);

export const PostView = (props: PostWithUser) => {
  const { post, author } = props;
  return (
    <div className="border-stale-400 flex gap-3 border-b px-4 py-8">
      <UserAvatar
        name={author.username}
        src={author.profileImageUrl}
        width={56}
        height={56}
        size={56}
        as={Image}
      />

      <div className="flex flex-col">
        <div className="flex text-slate-300">
          <span>
            <Link href={`/@${author.username}`}>{`@${author.username}`}</Link>
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

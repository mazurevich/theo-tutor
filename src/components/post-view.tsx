import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import { type PostWithUser } from "@/types";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const PostView = (props: PostWithUser) => {
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

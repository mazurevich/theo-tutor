import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { api } from "@/utils/api";
import { FormEvent, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";

export const CreatePostWizard = () => {
  const { user } = useUser();
  const ctx = api.useContext();

  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: async () => {
      if (inputRef.current) {
        inputRef.current.value = "";
      }
      await ctx.posts.getAll.invalidate();
    },
  });

  if (!user) {
    return null;
  }

  function handleCreatePost(formEvent: FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();
    if (!inputRef.current) {
      return;
    }
    const content = inputRef.current.value;
    mutate({
      content,
    });
  }

  return (
    <div className="w-ful flex grow gap-3">
      <Image
        className="h-14 w-14 rounded-full"
        src={user.profileImageUrl}
        alt="user profile image"
        width={56}
        height={56}
      />
      <form onSubmit={handleCreatePost}>
        <input
          disabled={isPosting}
          ref={inputRef}
          type="text"
          placeholder="Type some emoji here..."
          className="ml-1 grow bg-transparent px-2 py-4"
        />
      </form>
    </div>
  );
};

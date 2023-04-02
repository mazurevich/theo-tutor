import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { api } from "@/utils/api";
import React, { type FormEvent, useRef } from "react";
import toast from "react-hot-toast";
import { Loader } from "@/components/loader";

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
    onError: (error) => {
      debugger;
      const errorMessages = error?.data?.zodError?.fieldErrors.content?.[0];
      toast.error(errorMessages || "Something went wrong");
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
    <div className="w-ful relative flex grow items-center gap-3">
      <Image
        className="h-14 w-14 rounded-full"
        src={user.profileImageUrl}
        alt="user profile image"
        width={56}
        height={56}
      />
      <form onSubmit={handleCreatePost} className="flex grow">
        <input
          disabled={isPosting}
          ref={inputRef}
          type="text"
          placeholder="Type some emoji here..."
          className="ml-1 grow bg-transparent px-2 py-4 disabled:text-gray-400"
        />
      </form>
      {isPosting && <Loader className="" size={30} />}
    </div>
  );
};

import { useAuth, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { api } from "@/utils/api";
import React, { type FormEvent, useRef } from "react";
import toast from "react-hot-toast";
import { Loader } from "@/components/loader";
import { PopoverMenu, UserAvatar } from "ui";
import { useRouter } from "next/router";

export const CreatePostWizard = () => {
  const { user } = useUser();
  const auth = useAuth();
  const ctx = api.useContext();

  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: async () => {
      if (inputRef.current) {
        inputRef.current.value = "";
      }
      await ctx.posts.getAll.invalidate();
    },
    onError: (error) => {
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
      <PopoverMenu
        items={[
          {
            id: "sign-out",
            label: "Sign out",
            onClick: () => {
              void auth.signOut();
            },
          },
          {
            id: "profile",
            label: "Profile",
            onClick: () => {
              void router.push(`/@${user.username ?? ""}`);
            },
          },
        ]}
        menuButton={
          <UserAvatar
            name={user.username}
            size={56}
            as={Image}
            height={56}
            width={56}
            src={user.profileImageUrl}
          />
        }
        alignment="left"
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

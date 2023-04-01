import { useUser } from "@clerk/nextjs";
import Image from "next/image";

export const CreatePostWizard = () => {
  const { user } = useUser();

  if (!user) {
    return null;
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
      <input
        placeholder="Type some emoji here..."
        className="ml-1 grow bg-transparent px-2 py-4"
      />
    </div>
  );
};

import { Loader } from "@/components/loader";

export const LoadingPage = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Loader size={60} />
    </div>
  );
};

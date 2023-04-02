import { Loader } from "@/components/loader";
import { FC } from "react";

type LoadingPageProps = {
  size?: number;
};
export const LoadingPage: FC<LoadingPageProps> = ({ size = 60 }) => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Loader size={size} />
    </div>
  );
};

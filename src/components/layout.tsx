import { type PropsWithChildren } from "react";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <main className="mx-2 flex h-screen justify-center ">
      <div className="h-full w-full overflow-y-scroll border-x border-slate-400 md:max-w-2xl">
        {children}
      </div>
    </main>
  );
};

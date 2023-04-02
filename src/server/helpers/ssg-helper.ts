import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "@/server/api/root";
import { prisma } from "@/server/db";
import { type SignedOutAuthObject } from "@clerk/backend";
import superjson from "superjson";

export const generateSSGHelper = () => {
  return createProxySSGHelpers({
    router: appRouter,
    ctx: { prisma, auth: {} as SignedOutAuthObject },
    transformer: superjson, // optional - adds superjson serialization
  });
};

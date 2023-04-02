import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { clerkClient } from "@clerk/nextjs/api";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { filterUserForClient } from "@/server/helpers/utils";

export const profileRouter = createTRPCRouter({
  getUserByUsername: publicProcedure
    .input(z.object({ username: z.string().min(1) }))
    .query(async ({ input }) => {
      const [user] = await clerkClient.users.getUserList({
        username: [input.username],
      });
      if (!user || !user.username) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }
      return filterUserForClient(user);
    }),
});

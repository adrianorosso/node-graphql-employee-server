import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const memberResolvers = {
  Query: {
    allMembers: async () => {
      return await prisma.member.findMany({
        include: {
          contractor: true,
          employee: true,
        },
      });
    },

    // Find the members that have all the tags in the list
    findMembersByTags: async (
      parent: any,
      args: {
        tagFilter: string[];
      }
    ) => {
      return await prisma.member.findMany({
        where: { tags: { hasEvery: args.tagFilter } },
        include: { employee: true, contractor: true },
      });
    },
  },
};

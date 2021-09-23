import {
  Contractor,
  Employee,
  Member,
  MemberType,
  PrismaClient,
} from "@prisma/client";
import { ApolloError, UserInputError } from "apollo-server-errors";
import { isDurationValid, isIdValid } from "../utils/validations";

const prisma = new PrismaClient();

interface ICreateContractorInput {
  name: string;
  duration: number;
  tags: string[];
}

interface IUpdateContractorInput {
  id: number;
  name: string;
  duration: number;
  tags: string[];
}

/* CRUD */
export const contractorResolvers = {
  Query: {
    allContractors: async (): Promise<
      (Member & { contractor: Contractor[] })[]
    > => {
      return await prisma.member.findMany({
        where: { type: MemberType.CONTRACTOR },
        include: { contractor: true },
      });
    },

    getContractorById: async (
      parent: any,
      args: {
        id: number;
      }
    ) => {
      if (!isIdValid(args.id)) {
        throw new UserInputError("ID should be greater than 0");
      }
      return await prisma.member.findFirst({
        where: { AND: [{ id: args.id }, { type: MemberType.CONTRACTOR }] },
        include: { contractor: true },
      });
    },
  },

  Mutation: {
    createNewContractor: async (
      parent: any,
      args: { input: ICreateContractorInput }
    ) => {
      const { input } = args;

      if (!isDurationValid(input.duration)) {
        throw new UserInputError("Invalid duration");
      }

      try {
        const member = {
          name: input.name,
          type: MemberType.CONTRACTOR,
          tags: input.tags,
          contractor: { create: { duration: input.duration } },
        };

        return await prisma.member.create({ data: member });
      } catch (contractorErr) {
        throw new ApolloError(
          `Could not create new contractor ${contractorErr}`
        );
      }
    },

    deleteContractor: async (parent: any, args: { id: number }) => {
      try {
        if (!isIdValid(args.id)) {
          throw new UserInputError("ID should be greater than 0");
        }

        const deleteContractor = prisma.contractor.delete({
          where: {
            memberId: args.id,
          },
        });

        const deleteMember = prisma.member.delete({
          where: {
            id: args.id,
          },
        });

        const transaction = await prisma.$transaction([
          deleteContractor,
          deleteMember,
        ]);

        // returns the member data
        return transaction[1];
      } catch (delContractorErr) {
        throw new ApolloError(
          `Could not delete contractor ${delContractorErr}`
        );
      }
    },

    updateContractor: async (
      parent: any,
      args: { input: IUpdateContractorInput }
    ) => {
      const { input } = args;

      if (
        !isIdValid(input.id) ||
        (input.duration && !isDurationValid(input.duration))
      ) {
        throw new UserInputError("Invalid ID or duration");
      }

      try {
        await prisma.contractor.update({
          where: {
            memberId: input.id,
          },
          data: {
            duration: input.duration,
          },
        });

        await prisma.member.update({
          where: { id: input.id },
          data: {
            name: input.name,
            tags: input.tags,
            updatedAt: new Date(),
          },
        });

        return prisma.member.findFirst({
          where: { id: input.id },
          include: { contractor: true },
        });
      } catch (updateContractorErr) {
        throw new ApolloError(
          `Could not update contractor ${updateContractorErr}`
        );
      }
    },
  },
};

import { Employee, Member, MemberType, PrismaClient } from "@prisma/client";
import { UserInputError, ApolloError } from "apollo-server-errors";
import { isIdValid } from "../utils/validations";

interface ICreateEmployeeInput {
  name: string;
  role: string;
  tags: string[];
}

interface IUpdateEmployeeInput {
  id: number;
  name: string;
  role: string;
  tags: string[];
}

const prisma = new PrismaClient();

export const employeeResolvers = {
  Query: {
    allEmployees: async (): Promise<(Member & { employee: Employee[] })[]> => {
      return await prisma.member.findMany({
        where: { type: MemberType.EMPLOYEE },
        include: { employee: true },
      });
    },
    getEmployeeById: async (parent: any, args: { id: number }) => {
      if (!isIdValid(args.id)) {
        throw new UserInputError("ID should be greater than 0");
      }
      return await prisma.member.findFirst({
        where: { AND: [{ id: args.id }, { type: MemberType.EMPLOYEE }] },
        include: { employee: true },
      });
    },
  },

  Mutation: {
    createNewEmployee: async (
      parent: any,
      args: { input: ICreateEmployeeInput }
    ) => {
      const { input } = args;

      try {
        const member = {
          name: input.name,
          type: MemberType.EMPLOYEE,
          tags: input.tags,
          employee: { create: { role: input.role } },
        };

        return await prisma.member.create({ data: member });
      } catch (employeeErr) {
        throw new ApolloError(`Could not create new employee ${employeeErr}`);
      }
    },

    deleteEmployee: async (parent: any, args: { id: number }) => {
      try {
        if (!isIdValid(args.id)) {
          throw new UserInputError("ID should be greater than 0");
        }

        const deleteEmployee = prisma.employee.delete({
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
          deleteEmployee,
          deleteMember,
        ]);

        // returns the member data
        return transaction[1];
      } catch (delEmployeeErr) {
        throw new ApolloError(`Could not delete employee ${delEmployeeErr}`);
      }
    },

    updateEmployee: async (
      parent: any,
      args: { input: IUpdateEmployeeInput }
    ) => {
      const { input } = args;

      if (!isIdValid(input.id)) {
        throw new UserInputError("ID should be greater than 0");
      }

      try {
        await prisma.employee.update({
          where: {
            memberId: input.id,
          },
          data: {
            role: input.role,
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
          include: { employee: true },
        });
      } catch (updateEmployeeErr) {
        throw new ApolloError(`Could not update employee ${updateEmployeeErr}`);
      }
    },
  },
};

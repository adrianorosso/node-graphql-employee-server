import { ApolloServer } from "apollo-server";
import { employeeTypeDefs } from "./types/employeeTypes";
import { contractorResolvers } from "./resolvers/contractorResolvers";
import { employeeResolvers } from "./resolvers/employeeResolvers";
import { memberResolvers } from "./resolvers/memberResolvers";
import { memberTypeDefs } from "./types/memberTypes";
import { contractorTypeDefs } from "./types/contractorTypes";

const port = process.env.PORT || 4000;

new ApolloServer({
  resolvers: [memberResolvers, contractorResolvers, employeeResolvers],
  typeDefs: [memberTypeDefs, contractorTypeDefs, employeeTypeDefs],
}).listen({ port }, () =>
  console.log(`🚀 Server ready at: http://localhost:${port}`)
);

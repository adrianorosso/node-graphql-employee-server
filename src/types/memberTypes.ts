import { gql } from "apollo-server";

export const memberTypeDefs = gql`
  scalar Date

  enum MemberType {
    CONTRACTOR
    EMPLOYEE
  }

  #### Entity types ####
  type Member {
    id: Int!
    name: String!
    createdAt: Date
    updatedAt: Date
    type: MemberType!
    tags: [String]
  }

  #### Response types ####
  type MembersResponse {
    id: Int
    name: String
    type: MemberType
    tags: [String]
    contractor: [Contractor]
    employee: [Employee]
  }

  #### Queries ####
  type Query {
    allMembers: [MembersResponse]
    findMembersByTags(tagFilter: [String]): [MembersResponse]
  }
`;

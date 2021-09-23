import { gql } from "apollo-server";

export const contractorTypeDefs = gql`
  #### Entity types ####
  type Contractor {
    id: Int
    duration: Int
    memberId: Int
  }

  #### Input types ####
  input CreateContractorInput {
    name: String!
    duration: Int
    tags: [String]
  }

  input UpdateContractorInput {
    id: Int!
    name: String
    duration: Int
    tags: [String]
  }

  #### Response types ####
  type ContractorsResponse {
    id: Int
    name: String
    tags: [String]
    contractor: [Contractor]
  }

  #### Queries ####
  type Query {
    allContractors: [ContractorsResponse]
    getContractorById(id: Int): ContractorsResponse
  }

  #### Mutations ####
  type Mutation {
    createNewContractor(input: CreateContractorInput): ContractorsResponse
    deleteContractor(id: Int): ContractorsResponse
    updateContractor(input: UpdateContractorInput): ContractorsResponse
  }
`;

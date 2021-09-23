import { gql } from "apollo-server";

export const employeeTypeDefs = gql`
  #### Entity types ####
  type Employee {
    id: Int
    role: String
    memberId: Int
  }

  #### Input types ####
  input CreateEmployeeInput {
    name: String!
    role: String
    tags: [String]
  }

  input UpdateEmployeeInput {
    id: Int!
    name: String
    role: String
    tags: [String]
  }

  #### Response types ####
  type EmployeesResponse {
    id: Int
    name: String
    tags: [String]
    employee: [Employee]
  }

  #### Queries ####
  type Query {
    allEmployees: [EmployeesResponse]
    getEmployeeById(id: Int): EmployeesResponse
  }

  #### Mutations ####
  type Mutation {
    createNewEmployee(input: CreateEmployeeInput): EmployeesResponse
    deleteEmployee(id: Int): EmployeesResponse
    updateEmployee(input: UpdateEmployeeInput): EmployeesResponse
  }
`;

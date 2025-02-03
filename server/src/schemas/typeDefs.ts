import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    user(id: ID): User
    users: [User]
  }
    
  type Auth {
    token: ID!
    user: User
  }


  type Mutation {
    addIncome(id: ID!, month: String!, income: Float!): User
    addExpense(id: ID!, month: String!, expense: Float!): User
    addSavings(id: ID!, month: String!, savings: Float!): User
    addInvestment(id: ID!, month: String!, investment: Float!): User

    deleteIncome(id: ID!, month: String!): User
    deleteExpense(id: ID!, month: String!): User
    deleteSavings(id: ID!, month: String!): User
    deleteInvestment(id: ID!, month: String!): User

    login(login: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
  }

  type User {
    id: ID!
    name: String
    username: String
    email: String
    password: String
    monthlyIncome: [Income]
    monthlyExpenses: [Expense]
    currentSavings: [Savings]
    currentInvestments: [Investment]
  }

  type Income {
    month: String
    income: Float
  }

  type Expense {
    month: String
    category: String
    expense: Float
  }

  type Savings {
    month: String
    savings: Float
  }

  type Investment {
    month: String
    investment: Float
  }
`;

export default typeDefs;

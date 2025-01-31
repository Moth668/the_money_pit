import { gql } from 'graphql-tag';

const user = `
  type Query {
    name: String
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

export default user;

const typeDefs = gql`
  type User {
    username: String!
    email: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    login(login: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
  }
`;

export default typeDefs;

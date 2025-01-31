import { gql } from 'graphql-tag';

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
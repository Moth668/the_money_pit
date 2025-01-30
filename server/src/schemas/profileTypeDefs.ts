import { gql } from "apollo-server";

export const profileTypeDefs = gql`
  type Profile {
    name: String!
    email: String!
    picture: String
    address: String
    cards: [String]!
    username: String!
  }

  type Query {
    getProfile: Profile
    isLoggedIn: Boolean!
  }

  type Mutation {
    saveProfile(
      name: String!
      email: String!
      picture: String
      address: String
      cards: [String]!
      username: String!
    ): Profile
    logOut: Boolean
  }
`;

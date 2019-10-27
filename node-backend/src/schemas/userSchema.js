import { gql } from 'apollo-server';
import GraphQLDateTime from 'graphql-type-datetime';

export default gql`

  type User {
    id: ID!
    name: String!
    username: String!
    avatarUrl: String!
    """
    the list of Posts by this author
    """
    posts: [Post!]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Token {
    token: String!
  }

  # the schema allows the following query:
  extend type Query {
    user(id: ID!): User!
    login(name: String!, password: String!): Token!
    authenticate(email: String, password:String!): Token!
  }

  # this schema allows the following mutation:
  extend type Mutation {
    createUser(name: String!, username: String!, password: String!, avatarUrl: String, email: String!): User!
  }
`;

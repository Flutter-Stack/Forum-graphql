import { gql } from 'apollo-server';
import GraphQLDateTime from 'graphql-type-datetime';

export default gql`

  type Post {
    id: ID!
    body: String!
    thread: Thread!
    author: User!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  extend type Query {
    post(id: ID!): Post!
    posts: [Post!]!
  }

  extend type Mutation {
    createPost(body: String!, threadId: ID!): Post!
  }
`;

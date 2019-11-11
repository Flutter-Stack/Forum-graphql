import { gql } from 'apollo-server';
import GraphQLDateTime from 'graphql-type-datetime';

export default gql`

  type Post {
    id: ID!
    body: String!
    thread: Thread!
    createdAt: DateTime!
    updatedAt: DateTime!
    author: User!
  }

  extend type Subscription {
    postAdded(threadId: ID!): Post
  }

  extend type Query {
    post(id: ID!): Post!
    posts(threadId: ID): [Post!]!
  }

  extend type Mutation {
    createPost(body: String!, threadId: ID!): Post!
  }
`;

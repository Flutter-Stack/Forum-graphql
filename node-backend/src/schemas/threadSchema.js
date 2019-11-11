
import { gql } from 'apollo-server';
import GraphQLDateTime from 'graphql-type-datetime';

export default gql`

  type Thread {
    id: ID!
    title: String!
    slug: String!
    category: Category!
    posts: [Post!]!
    insertedAt: DateTime!
    updatedAt: DateTime!
    author: User!
  }

  extend type Subscription {
    threadAdded(categoryId: ID!): Thread
  }

  extend type Query {
    thread(id: ID!): Thread!
    threads: [Thread!]!
  }

  extend type Mutation {
    createThread(title: String!, category: ID!, body: String!): Thread!
  }
`;

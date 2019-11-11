import { gql } from 'apollo-server';
import GraphQLDateTime from 'graphql-type-datetime';

export default gql`
  scalar DateTime

  type Category {
    id: ID!
    title: String!
    slug: String!
    threads: [Thread!]!
    createdAt: DateTime!
    updatedAt: DateTime!
    author: User!
  }

  type PaginatedCategories {
    entries: [Category]
    page: Int!
    perPage: Int!
    totalEntries: Int!
    totalPages: Int!
  }

  type Subscription {
    categoryAdded: Category
  }

  extend type Query {
    category(id: ID!): Category!
    categories(page: Int, perPage: Int ): PaginatedCategories
  }

  extend type Mutation {
    createCategory(
      title: String!,
    ): Category!
  }
`;

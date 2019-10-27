import userSchema from './userSchema';
import postSchema from './postSchema';
import categorySchema from './categorySchema';
import threadSchema from './threadSchema';

import { gql } from 'apollo-server';

const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;

export default [linkSchema, userSchema, postSchema, categorySchema, threadSchema];

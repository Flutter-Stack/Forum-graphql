import { AuthenticationError } from 'apollo-server';
import slugify from 'slugify-string';

export default {
  Query: {
    post: async (parent, { id }, { models: { Post }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const post = await Post.findById({ _id: id }).exec();
      return post;
    },
    posts: async (parent, args, { models: { Post }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const posts = await Post.find({ author: me.id }).exec();
      return posts;
    },

  },
  Mutation: {
    createPost: async (parent, { body, threadId }, { models: { Post }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const post = await Post.create({ body:body, thread: threadId, author: me.id  });
      return post;
    },
  },
  Post: {
    author: async ({ author }, args, { models: { User } }, info) => {
      console.log(author);
      const user = await User.findById({ _id: author }).exec();
      return user;
    },
  },
};

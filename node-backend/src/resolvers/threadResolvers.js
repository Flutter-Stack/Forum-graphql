import { AuthenticationError } from 'apollo-server';
import slugify from 'slugify-string';

export default {
  Query: {
    thread: async (parent, { id }, { models: { Thread }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const thread = await Thread.findById({ _id: id }).exec();
      return thread;
    },
    threads: async (parent, args, { models: { Thread }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const threads = await Thread.find({ author: me.id }).exec();
      return threads;
    },
  },
  Mutation: {
    createThread: async (parent, { title, category, body }, { models: { Thread }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const thread = await Thread.create({ title : title, slug : slugify(title), category: category, body: body, author: me.id });
      return thread;
    },
  },
  Thread: {
    author: async ({ author }, args, { models: { Thread } }, info) => {
      const user = await Thread.findById({ _id: author }).exec();
      return user;
    },
    posts: async ({ id }, args, { models: { Post } }, info) => {
      const posts = await Post.find({ thread: id }).exec();
      return posts;
    },
  },

};

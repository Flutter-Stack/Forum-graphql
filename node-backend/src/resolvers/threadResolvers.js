import { AuthenticationError, PubSub } from 'apollo-server';
import slugify from 'slugify-string';

const pubsub = new PubSub();
const THREAD_ADDED = 'THREAD_ADDED';

export default {
  Query: {
    thread: async (parent, { id }, { models: { Thread }, me, pubsub }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      console.log("I am inside thread");
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
      pubsub.publish('THREAD_ADDED', { threadAdded: thread });
      return thread;
    },
  },
  Subscription: {
   threadAdded : {
      subscribe: () => pubsub.asyncIterator(THREAD_ADDED)
    }
  },
  Thread: {
    author: async ({ author }, args, { models: { User } }, info) => {
      const user = await User.findById({ _id: author }).exec();
      return user;
    },
    posts: async ({ id }, args, { models: { Post } }, info) => {
      const posts = await Post.find({ thread: id }).exec();
      return posts;
    },
  },

};

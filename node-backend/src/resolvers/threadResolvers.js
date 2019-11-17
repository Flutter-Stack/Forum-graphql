import { AuthenticationError, PubSub } from 'apollo-server-express';
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
      const thread = await Thread.findById({ _id: id }).populate('author').exec();
      return thread;
    },
    threads: async (parent, args, { models: { Thread }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const threads = await Thread.find({ author: me.id }).populate('author').exec();
      return threads;
    },
  },
  Mutation: {
    createThread: async (parent, { title, category, body }, { models: { Thread, User }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const thread = await Thread.create({ title : title, slug : slugify(title), category: category, body: body, author: me.id });
      const completethread = await thread.populate('author').execPopulate();      
      pubsub.publish('THREAD_ADDED', { threadAdded: completethread });
      return completethread;
    },
  },
  Subscription: {
   threadAdded : {
      subscribe: () => pubsub.asyncIterator(THREAD_ADDED)
    }
  },
  // Thread: {
  //   author: async ({ author }, args, { models: { User } }, info) => {
  //     const user = await User.findById({ _id: author }).exec();
  //     return user;
  //   },
  //   posts: async ({ id }, args, { models: { Post } }, info) => {
  //     const posts = await Post.find({ thread: id }).exec();
  //     return posts;
  //   },
  // },

};

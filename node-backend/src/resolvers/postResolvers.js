import { AuthenticationError, PubSub } from 'apollo-server';
import slugify from 'slugify-string';

const pubsub = new PubSub();

const POST_ADDED = 'POST_ADDED';

export default {
  Query: {
    post: async (parent, { id }, { models: { Post }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const post = await Post.findById({ _id: id }).exec();
      return post;
    },
    posts: async (parent, { id }, { models: { Post }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const posts = await Post.find({ thread: id }).exec();
      return posts;
    },
  },
  Mutation: {
    createPost: async (parent, { body, threadId }, { models: { Post }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const post = await Post.create({ body:body, thread: threadId, author: me.id  });
      pubsub.publish('POST_ADDED', { postAdded: post });
      return post;
    },
  },
  Subscription: {
    postAdded: {
      subscribe: () =>  pubsub.asyncIterator(POST_ADDED)
    }
  },
  Post: {
    author: async ( { author }, args, { models: { User } }, info) => {
      const user = await User.findById({ _id: author }).exec();
      return user;
      // return {
      //   "_id": "5db46b15f8a32304f0264c91,",
      //       "name": "test",
      //       "avatarUrl": "test",
      //       "email": "",
      //       "password": "pass"
      // }
    },
  },
};

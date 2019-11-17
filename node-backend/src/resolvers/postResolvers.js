import { AuthenticationError, PubSub } from 'apollo-server-express';
import slugify from 'slugify-string';

const pubsub = new PubSub();

const POST_ADDED = 'POST_ADDED';

export default {
  Query: {
    post: async (parent, { id }, { models: { Post }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const post = await Post.findById({ _id: id }).populate('author').exec();
      return post;
    },
    posts: async (parent, { id }, { models: { Post }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const posts = await Post.find({ thread: id }).populate('author').exec();
      return posts;
    },
  },
  Mutation: {
    createPost: async (parent, { body, threadId }, { models: { Post}, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const post = await Post.create({ body:body, thread: threadId, author: me.id  });
      const completepost = await post.populate('author').execPopulate();
      pubsub.publish('POST_ADDED', { postAdded: completepost });
      return completepost;
    },
  },
  Subscription: {
    postAdded: {
      subscribe: () =>  pubsub.asyncIterator(POST_ADDED)
    }
  },
  // Post: {
  //   author: async ( { author }, args, { models: { User } }, info) => {
  //     const user = await User.findById({ _id: author }).exec();
  //     return user;
  //     // return {
  //     //   "_id": "5db46b15f8a32304f0264c91,",
  //     //       "name": "test",
  //     //       "avatarUrl": "test",
  //     //       "email": "",
  //     //       "password": "pass"
  //     // }
  //   },
  // },
};

import { AuthenticationError, PubSub } from 'apollo-server-express';
import slugify from 'slugify-string';

const pubsub = new PubSub();

var CATEGORY_ADDED = 'CATEGORY_ADDED';

export default {
  Query: {
    category: async (parent, { id }, { models: { Category }, me  }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const category = await Category.findById({ _id: id }).populate('author').exec();

      return category;
    },
    categories: async (parent, { page=1, perPage=10 }, { models: { Category } }, info) => {
      // if (!me) {
      //   throw new AuthenticationError('You are not authenticated');
      // }
      const options = {
        page: page,
        limit: perPage,
      };
      const categories = await Category.paginate({}, options).populate('author');
      return {
        entries: categories.docs,
        page: categories.page,
        perPage: perPage,
        totalEntries: categories.totalDocs,
        totalPages: categories.totalPages
      }
    },
  },
  Mutation: {
    createCategory: async (parent, { title }, { models: { Category, }, me, }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const category = await Category.create({ title: title, slug: slugify(title) , author: me.id });
      const completecategory = await category.populate('author').execPopulate();
//
          const threads = await Thread.find({ category : id }).exec();

      pubsub.publish('CATEGORY_ADDED', { categoryAdded: completecategory });
      return completecategory;
    },
  },
  Subscription: {
    categoryAdded : {
      subscribe: () => pubsub.asyncIterator([CATEGORY_ADDED])
      // async (_, _, { pubSub }, info) => {
      //   console.log("subscription resolvers");
      //   try {
      //     console.log(pubsub.asyncIterator([CATEGORY_ADDED]));
      //   } catch (e) {
      //      console.log(e);
      //   }
      //   return pubsub.asyncIterator([CATEGORY_ADDED])
      // }
    }
  },
  // Category: {
  //   author: async ({ author }, args, { models: { User } }, info) => {
  //     const user = await User.findById({ _id: author }).exec();
  //     return user;
  //   },
  //   threads: async ({ id }, args, { models: { Thread } }, info) => {
  //     const threads = await Thread.find({ category : id }).exec();
  //     return threads;
  //   },
  // },
};

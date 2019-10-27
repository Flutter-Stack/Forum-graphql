import { AuthenticationError } from 'apollo-server';
import slugify from 'slugify-string';

export default {
  Query: {
    category: async (parent, { id }, { models: { Category }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const category = await Category.findById({ _id: id }).exec();
      return category;
    },
    categories: async (parent, { pagination }, { models: { Category }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const options = {
        page: pagination.page,
        limit: pagination.perPage,
      };
      const categories = await Category.paginate({}, options);
      return {
        entries: categories.docs,
        page: categories.page,
        perPage: pagination.perPage,
        totalEntries: categories.totalDocs,
        totalPages: categories.totalPages
      }
    },
  },
  Mutation: {
    createCategory: async (parent, { title }, { models: { Category }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const category = await Category.create({ title: title, slug: slugify(title) , author: me.id });
      return category;
    },
  },
  Category: {
    author: async ({ author }, args, { models: { User } }, info) => {
      const user = await User.findById({ author }).exec();
      return user;
    },
    threads: async ({ id }, args, { models: { Thread } }, info) => {
      const threads = await Thread.find({ category : id }).exec();
      return threads;
    },
  },
};

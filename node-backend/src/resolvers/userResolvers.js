import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server';

export default {
  Query: {
    user: async (parent, { id }, { models: { User }, me }, info) => {
      if (!me) {
        throw new AuthenticationError('You are not authenticated');
      }
      const user = await User.findById({ _id: id }).exec();
      return user;
    },
    login: async (parent, { name, password }, { models: { User }, me }, info) => {
      const user = await User.findOne({ name }).exec();

      if (!user) {
        throw new AuthenticationError('Invalid credentials');
      }

      const matchPasswords = bcrypt.compareSync(password, user.password);

      if (!matchPasswords) {
        throw new AuthenticationError('Invalid credentials');
      }

      const token = jwt.sign({ id: user.id }, 'riddlemethis', { expiresIn: 24 * 24 * 50 });

      return {
        token,
      };
    },
    authenticate: async(parent, { email, password }, { models: { User }, me }, info)  => {

      const user = await User.findOne({ email: email }).exec();
      if (!user) {
        throw new AuthenticationError('Invalid credentials');
      }

      const matchPasswords = bcrypt.compareSync(password, user.password);
      console.log(matchPasswords);
      if (!matchPasswords) {
        throw new AuthenticationError('Invalid credentials');
      }

      const token = jwt.sign({ id: user.id }, 'riddlemethis', { expiresIn: 24 * 10 * 50 });
      return { token };
    }
  },
  Mutation: {
    createUser: async (parent, { name, username, email, password, avatarUrl }, { models: { User }, me }, info) => {
      const user = await User.create({ name, username, email, password, avatarUrl });
      return user;
    },
  },
  User: {
    posts: async ( { id }, args, { models: { Post } }, info) => {
      const posts = await postModel.find({ author: id }).exec();
      return posts;
    },
  },
};

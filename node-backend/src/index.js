import { ApolloServer, gql, PubSub } from "apollo-server";
import jwt from 'jsonwebtoken';
import dbConfig from './config/dbConfig';
import mongoose from 'mongoose';
import schemas from './schemas';
import resolvers from './resolvers';
import User from './models/userModel';
import Post from './models/postModel';
import Category from './models/categoryModel';
import Thread from './models/threadModel';

const PORT = 3000
const getUser = async (req) => {
  const token = req.headers['authorization'];
  if (token) {
    try {
      return await jwt.verify(token, 'riddlemethis');
    } catch (e) {
      throw new AuthenticationError('Your session expired. Sign in again.');
    }
  }
};

const server = new ApolloServer({
  typeDefs: schemas,
  resolvers,
  context: async ({ req , res }) => {
    if (req, res) {
      const me = await getUser(req);
      return {
        req,
        res,
        me,
        models: {
          User,
          Post,
          Category,
          Thread,
        },
      };
    }
  },
  subscriptions: {
    path: `/socket/websocket`
  }
});

server.listen(PORT).then(({ url }) => {
  mongoose.connect(dbConfig.url, {
      useNewUrlParser: true,
      user: dbConfig.user,
      pass: dbConfig.pwd,
      useUnifiedTopology: true
  }).then(() => {
      console.log('successfully connected to the database');
  }).catch(err => {
      console.log(err);
      console.log('error connecting to the database');
      process.exit();
  });

  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
});

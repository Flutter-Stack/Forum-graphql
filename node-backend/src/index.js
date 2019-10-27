import cors from 'cors';
import express from 'express';
import jwt from 'jsonwebtoken';
import dbConfig from './config/dbConfig';
import mongoose from 'mongoose';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';

import schemas from './schemas';
import resolvers from './resolvers';

import User from './models/userModel';
import Post from './models/postModel';
import Category from './models/categoryModel';
import Thread from './models/threadModel';

const app = express();
app.use(cors());

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
  context: async ({ req }) => {
    if (req) {
      const me = await getUser(req);
      return {
        me,
        models: {
          User,
          Post,
          Category,
          Thread
        },
      };
    }
  },
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen(3000, () => {
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
});

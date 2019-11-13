import { ApolloServer, gql, PubSub } from "apollo-server-express";
import jwt from 'jsonwebtoken';
import dbConfig from './config/dbConfig';
import mongoose from 'mongoose';
import schemas from './schemas';
import resolvers from './resolvers';
import User from './models/userModel';
import Post from './models/postModel';
import Category from './models/categoryModel';
import Thread from './models/threadModel';
import http from 'http';
import express from 'express';
const pubsub = new PubSub();
const app = new express();

const PORT = 3000;
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
  context: async ({ req , connection }) => {
    if (req) {
      const me = await getUser(req);
      return {
        req,
        me,
        models: {
          User,
          Post,
          Category,
          Thread,
        },
      };
    } else if (connection) {
      return connection.context // this is important if you want use socket context
    }
  },
  subscriptions: {
    path: `/socket/websocket`
  }
});

server.applyMiddleware({app})
const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
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

  console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  console.log(`Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
})

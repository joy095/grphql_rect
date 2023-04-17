import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageDisabled,
} from "apollo-server-core";
import mongoose from "mongoose";
import Jwt from "jsonwebtoken";
import typeDefs from "./schemaGql.js";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import path from "path";
const __dirname = path.resolve();

const port = process.env.PORT || 4000;
const app = express();
const httpServer = http.createServer(app);

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

mongoose.connect(process.env.MONGO_URL);
mongoose.connection.on("connected", () => {
  console.log("connected to mongodb");
});
mongoose.connection.on("error", (err) => {
  console.log("error connecting", err);
});

// import models
import "./models/User.js";
import "./models/Quotes.js";

import resolvers from "./resolvers.js";

// this is middleware
const context = ({ req }) => {
  const { authorization } = req.headers;
  if (authorization) {
    const { userId } = Jwt.verify(authorization, process.env.JWT_SECRET);
    return { userId };
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    process.env.NODE_ENV !== "production"
      ? ApolloServerPluginLandingPageGraphQLPlayground()
      : ApolloServerPluginLandingPageDisabled(),
  ],
});
// if (process.env.NODE_ENV !== "production") {
app.use(express.static("client/build"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});
// }

await server.start();
server.applyMiddleware({ app, path: "/graphql" });

httpServer.listen({ port }, () => {
  console.log(`Server is ready at port: ${port}${server.graphqlPath}`);
});

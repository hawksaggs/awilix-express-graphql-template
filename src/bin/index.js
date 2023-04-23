#!/usr/bin/env node

/**
 * Module dependencies.
 */
import loadApp from "../app";
import http from "http";
import express from "express";
import getContainer from "../container";
import { readFile } from "fs/promises";
import { ApolloServer } from "@apollo/server";
import { resolvers } from "../graphql/resolvers";
import { expressMiddleware } from "@apollo/server/express4";

async function getContext({ req }) {
  const context = { container: req.scope };
  if (req.user) {
    context.user = await context.container
      .resolve("userService")
      .getUserByEmail(req.user.email);
  }
  return context;
}

getContainer()
  .then(async (container) => {
    console.log(container);
    const app = express();
    loadApp(app, { container }).then(async (app) => {
      const port = normalizePort(process.env.PORT || "3000");
      app.set("port", port);
      const server = http.createServer(app);
      const typeDefs = await readFile("./src/graphql/schemas/schema.graphql", "utf8");
      const apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
      });
      await apolloServer.start();
      app.use(
        "/graphql",
        expressMiddleware(apolloServer, { context: getContext })
      );

      server.listen({ port }, () => {
        console.log(`Server running on port ${port}`);
        console.log(
          `GraphQL Server running on http://localhost:${port}/graphql`
        );
      });
      // server.on('error', onError);
      // server.on('listening', onListening);
    });
  })
  .catch((err) => {
    console.log(err);
  });

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

// function onError(error) {
//   if (error.syscall !== "listen") {
//     throw error;
//   }
//
//   const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
//
//   // handle specific listen errors with friendly messages
//   switch (error.code) {
//     case "EACCES":
//       console.error(bind + " requires elevated privileges");
//       process.exit(1);
//       break;
//     case "EADDRINUSE":
//       console.error(bind + " is already in use");
//       process.exit(1);
//       break;
//     default:
//       throw error;
//   }
// }

/**
 * Event listener for HTTP server "listening" event.
 */

// function onListening(server) {
//   const addr = server.address();
//   const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
//   debug("Listening on " + bind);
// }

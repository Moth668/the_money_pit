import express, { Request, Response } from "express";
import path from "node:path";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

import { typeDefs, resolvers, profileResolvers, profileTypeDefs } from "./schemas/index.js"; // Combined typeDefs and resolvers
import db from "./config/connection.js";
import { authenticateToken } from "./utils/auth.js";

const startApolloServer = async () => {
  try {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      profileResolvers,
      profileTypeDefs,
      context: ({ req }: { req: Request }) => {
        return { user: req.user, session: req.session };
      },
      
    });

    await server.start();
    await db();

    const PORT = process.env.PORT || 3001;
    const app = express();

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    // Integrate Apollo Server
    app.use(
      "/graphql",
      expressMiddleware(server, {
        context: authenticateToken, // Pass authentication middleware
      })
    );

    // Serve React app in production
    if (process.env.NODE_ENV === "production") {
      app.use(express.static(path.join(__dirname, "../client/dist")));

      app.get("*", (_req: Request, res: Response) => {
        res.sendFile(path.join(__dirname, "../client/dist/index.html"));
      });
    }

    // Start the server
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

startApolloServer();

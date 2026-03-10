import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./Schema/typeDefs.js";
import { resolvers } from "./Resolvers/resolvers.js";
import jwt from "jsonwebtoken";

const accessSecret = "accessSecret";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },

  context: async ({ req }) => {
    const authHeader = req.headers.authorization || "";

    if (!authHeader) {
      return { user: null };
    }

    const token = authHeader.replace("Bearer ", "");

    try {
      const decoded = jwt.verify(token, accessSecret);
      return { user: decoded };
    } catch {
      return { user: null };
    }
  },
});

console.log(`🚀 Server ready at: ${url}`);

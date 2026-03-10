import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import { requireAuth } from "../utils/authMiddleware.js";

const accessSecret = "accessSecret";
const refreshSecret = "refreshSecret";

const todosPath = path.join(process.cwd(), "src/Data/todos.json");
const usersPath = path.join(process.cwd(), "src/Data/users.json");

const readTodos = () => {
  return JSON.parse(fs.readFileSync(todosPath, "utf-8"));
};

const writeTodos = (todos: any) => {
  fs.writeFileSync(todosPath, JSON.stringify(todos, null, 2));
};

const readUsers = () => {
  return JSON.parse(fs.readFileSync(usersPath, "utf-8"));
};

export const resolvers = {
  Query: {
    users: (_: unknown, __: unknown, context: any) => {
      requireAuth(context);
      return readUsers();
    },

    user: (_: unknown, { id }: { id: number }, context: any) => {
      requireAuth(context);

      const users = readUsers();
      return users.find((u: any) => u.id === id);
    },

    todos: (_: unknown, __: unknown, context: any) => {
      requireAuth(context);

      const todos = readTodos();

      return todos.filter((t: any) => t.userId === context.user.userId);
    },
  },

  Mutation: {
    login: (_: unknown, { username, password }: any) => {
      const users = readUsers();

      const user = users.find((u: any) => u.username === username);

      if (!user) {
        throw new Error("user not found");
      }

      if (user.password !== password) {
        throw new Error("invalid password");
      }

      const accessToken = jwt.sign({ userId: user.id }, accessSecret, { expiresIn: "60m" });

      const refreshToken = jwt.sign({ userId: user.id }, refreshSecret, { expiresIn: "7d" });

      return {
        accessToken,
        refreshToken,
      };
    },

    addTodo: (_: unknown, { input }: any, context: any) => {
      requireAuth(context);

      const todos = readTodos();

      const newTodo = {
        id: todos.length + 1,
        todo: input.todo,
        completed: input.completed,
        userId: context.user.userId,
      };

      todos.push(newTodo);

      writeTodos(todos);

      return newTodo;
    },

    updateTodo: (_: unknown, { input }: any, context: any) => {
      requireAuth(context);

      const todos = readTodos();

      const index = todos.findIndex((t: any) => t.id === input.id);

      if (index === -1) {
        throw new Error("todo not found");
      }

      if (todos[index].userId !== context.user.userId) {
        throw new Error("not authorized");
      }

      const updatedTodo = {
        ...todos[index],
        ...input,
      };

      todos[index] = updatedTodo;

      writeTodos(todos);

      return updatedTodo;
    },

    deleteTodo: (_: unknown, { id }: { id: number }, context: any) => {
      requireAuth(context);

      const todos = readTodos();

      const todo = todos.find((t: any) => t.id === id);

      if (!todo) {
        throw new Error("todo not found");
      }

      if (todo.userId !== context.user.userId) {
        throw new Error("not authorized");
      }

      const filteredTodos = todos.filter((t: any) => t.id !== id);

      writeTodos(filteredTodos);

      return true;
    },
  },

  User: {
    todos: (parent: any, _: unknown, context: any) => {
      requireAuth(context);

      const todos = readTodos();

      return todos.filter((t: any) => t.userId === parent.id);
    },
  },
};

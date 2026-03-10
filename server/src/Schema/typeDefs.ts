export const typeDefs = `#graphql

type Todo {
  id: Int
  todo: String
  completed: Boolean
  userId: Int
}

type User {
  id: Int
  firstName: String
  lastName: String
  username: String
  image: String
  todos: [Todo]
}

type AuthPayload {
  accessToken: String
  refreshToken: String
}

input AddTodoInput {
  todo: String!
  completed: Boolean!
}

input UpdateTodoInput {
  id: Int!
  todo: String
  completed: Boolean
}

type Query {
  users: [User]
  user(id: Int!): User
  todos: [Todo]
}

type Mutation {
  login(username: String!, password: String!): AuthPayload
  addTodo(input: AddTodoInput!): Todo
  updateTodo(input: UpdateTodoInput!): Todo
  deleteTodo(id: Int!): Boolean
}
`;

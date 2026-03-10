import { gql } from "@apollo/client";

export const loginMutation = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      accessToken
      refreshToken
    }
  }
`;

export const getTodos = gql`
  query GetTodos {
    todos {
      id
      todo
      completed
    }
  }
`;

export const addTodoMutation = gql`
  mutation AddTodo($input: AddTodoInput!) {
    addTodo(input: $input) {
      id
      todo
      completed
    }
  }
`;

export const updateTodoMutation = gql`
  mutation UpdateTodo($input: UpdateTodoInput!) {
    updateTodo(input: $input) {
      id
      todo
      completed
    }
  }
`;

export const deleteTodoMutation = gql`
  mutation DeleteTodo($id: Int!) {
    deleteTodo(id: $id)
  }
`;

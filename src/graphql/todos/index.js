// @flow
import gql from 'graphql-tag';

export const getTodos = gql`
  query GetTodos {
    todos @client {
      id
      value
    },
  }
`;

export const appendTodo = gql`
  mutation appendTodo($id: Number, $value: String) {
    appendTodo(id: $id, value: $value) @client
  }
`;

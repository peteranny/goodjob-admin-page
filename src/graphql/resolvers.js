// TODO: add flow
import { getTodos } from '../graphql/todos';

const resolvers = {
  Mutation: {
    appendTodo: (_, { id, value }, { cache }) => {
      const { todos: prevTodos } = cache.readQuery({ query: getTodos });
      const data = {
        todos: prevTodos.concat({
          __typename: 'todoItem',
          id,
          value
        })
      };
      cache.writeQuery({ query: getTodos, data });

      return null;
    }
  }
};

export default resolvers;

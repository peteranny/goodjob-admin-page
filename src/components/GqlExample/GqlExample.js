// @flow
import * as React from 'react';
import { withState, compose, defaultProps, type HOC } from 'recompose';
import { graphql } from 'react-apollo';

import { getPokemon } from './pokemon';
import { getTodos, appendTodo as appendTodoGql } from '../../graphql/todos';

type Props = {};

type PropsFromHOC = {
  todos: Array<{
    id: number,
    value: string
  }>,
  inputText: string,
  setInputText: string => void,
  appendTodo: ({
    variables: {
      id: number,
      value: string
    }
  }) => void,
  pokemon: {
    id: string,
    number: string,
    name: string
  }
};

const handleKeyPress = (callback: any => void) => (e: SyntheticKeyboardEvent<*>) => {
  if (e.key === 'Enter') {
    callback();
  }
};

const GqlExample = ({
  todos,
  inputText,
  setInputText,
  appendTodo,
  pokemon
}: Props & PropsFromHOC) => (
  <div>
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.value}</li>
      ))}
    </ul>
    <input
      type="text"
      onChange={e => setInputText(e.target.value)}
      onKeyPress={handleKeyPress(() => {
        appendTodo({
          variables: {
            id: Math.max(...todos.map(d => d.id)) + 1,
            value: inputText
          }
        });
        setInputText('');
      })}
      value={inputText}
    />
    <hr />
    <h2>Pokemon</h2>
    <p>id: {pokemon.id}</p>
    <p>number: {pokemon.number}</p>
    <p>name: {pokemon.name}</p>
  </div>
);

const hoc: HOC<*, Props> = compose(
  graphql(getTodos, {
    props: ({ data: { todos } }) => ({
      todos
    })
  }),
  graphql(getPokemon, {
    props: ({ data: { pokemon } }) => ({
      pokemon
    })
  }),
  graphql(appendTodoGql, { name: 'appendTodo' }),
  withState('inputText', 'setInputText', ''),
  defaultProps({
    pokemon: {
      id: '',
      number: '',
      name: ''
    }
  })
);

export default hoc(GqlExample);

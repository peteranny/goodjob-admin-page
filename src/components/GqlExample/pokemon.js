// @flow
import gql from 'graphql-tag';

export const getPokemon = gql`
{
  pokemon(name: "Pikachu") {
    id
    number
    name
  }
}
`;

// @flow
import * as React from 'react';

type Props = {
  children: React.Node,
};

const App = ({ children }: Props) => (
  <main>
    {children}
  </main>
);

export default App;

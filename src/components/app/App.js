// @flow
import * as React from 'react';
import { Layout } from 'antd';
import 'antd/dist/antd.css';


import Header from './Header';
import Sidebar from './Sidebar';

type Props = {
  children: React.Node,
};

const App = ({ children }: Props) => (
  <Layout>
    <Header />
    <Layout>
      <Sidebar />
      {children}
    </Layout>
  </Layout>
);

export default App;

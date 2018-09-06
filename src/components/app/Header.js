// @flow
import React from 'react';
import { Layout } from 'antd';

const { Header: HeaderAnt } = Layout;

const Header = () => (
  <HeaderAnt className="header" style={{ color: 'white' }}>
    <span>GoodJob Admin Page</span>
  </HeaderAnt>
);

export default Header;

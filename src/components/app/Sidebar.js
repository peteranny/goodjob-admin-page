// @flow
import React from 'react';
import { Layout, Menu } from 'antd';
import { withRouter, type Location } from 'react-router';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

type Prop = {
  location: Location
};

const Sidebar = ({ location: { pathname } }: Prop) => (
  <Sider width={100} style={{ background: '#fff' }}>
    <Menu selectedKeys={[pathname]} mode="inline" style={{ height: '100%', borderRight: 0 }}>
      <Menu.Item key="/time-and-salary">
        <Link to="/time-and-salary">工時薪資</Link>
      </Menu.Item>
      <Menu.Item key="/work-experience">
        <Link to="/work-experience">工作經驗</Link>
      </Menu.Item>
      <Menu.Item key="/interview">
        <Link to="/interview">面試經驗</Link>
      </Menu.Item>
    </Menu>
  </Sider>
);

export default withRouter(Sidebar);

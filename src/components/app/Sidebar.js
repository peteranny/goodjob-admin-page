// @flow
import React from 'react';
import { Layout, Menu } from 'antd';
import {
  withRouter,
  type Location,
  type RouterHistory,
} from 'react-router';

const { Sider } = Layout;

type Prop = {
  history: RouterHistory,
  location: Location,
}

const Sidebar = ({
  history: {
    push,
  },
  location: {
    pathname,
  },
}: Prop) => (
  <Sider width={100} style={{ background: '#fff' }}>
    <Menu
      selectedKeys={[pathname]}
      mode="inline"
      style={{ height: '100%', borderRight: 0 }}
    >
      <Menu.Item key="/time-and-salary" onClick={() => push('time-and-salary')}>工時薪資</Menu.Item>
      <Menu.Item key="/work-experience" onClick={() => push('work-experience')}>工作經驗</Menu.Item>
      <Menu.Item key="/interview" onClick={() => push('interview')}>面試經驗</Menu.Item>
    </Menu>
  </Sider>
);

export default withRouter(Sidebar);

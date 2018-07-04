// @flow
import * as React from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

type Props = {
  children: React.Node,
}

const AdminLayout = ({ children }: Props) => (
  <Layout style={{ padding: '0 24px 24px' }}>
    <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 'calc(100vh - 88px)' }}>
      {children}
    </Content>
  </Layout>
);

export default AdminLayout;

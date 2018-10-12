// @flow
import React from 'react';
import { Layout, Icon } from 'antd';

const { Content } = Layout;

const REACT_APP_API_HOST = process.env.REACT_APP_API_HOST || '';

const LoginPage = () => (
  <Layout style={{ padding: '0 24px 24px' }}>
    <Content
      style={{
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <a href={`${REACT_APP_API_HOST}/auth/facebook`}>
        <Icon
          style={{
            fontSize: '10rem'
          }}
          type="login"
          theme="outlined"
        />
      </a>
    </Content>
  </Layout>
);

export default LoginPage;

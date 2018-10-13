// FIXME: use flow
import React from 'react';
import { Layout } from 'antd';
import { withRouter, type Location } from 'react-router';
import { type HOC, compose } from 'recompose';

import styles from './LoginPage.m.css';
import FacebookLogo from './FacebookLogo.component.svg';

const { Content } = Layout;

const REACT_APP_API_HOST = process.env.REACT_APP_API_HOST || '';

type Props = {};

type PropsFromHOC = {
  location: Location
};

const LoginPage = ({ location: { pathname } }: Props & PropsFromHOC) => (
  <Layout style={{ padding: '0 24px 24px' }}>
    <h1
      style={{
        textAlign: 'center',
        marginBottom: '20px'
      }}
    >
      Login
    </h1>
    <Content
      style={{
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <a href={`${REACT_APP_API_HOST}/auth/facebook?redirect=${pathname}`}>
        <FacebookLogo className={styles.loginLogo} />
      </a>
    </Content>
  </Layout>
);

const hoc: HOC<*, Props> = compose(withRouter);

export default hoc(LoginPage);

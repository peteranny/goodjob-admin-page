// @flow
import * as React from 'react';
import { type HOC, compose, withProps, lifecycle } from 'recompose';
import { Layout } from 'antd';
import 'antd/dist/antd.css';

import { graphql } from 'react-apollo';

import { getLoginStatusGQL, changeLoginStatusGQL } from '../../graphql/loginStatus';
import { getPlaceholderGQL } from '../../graphql/placeholder';

import { LOGIN_STATUS, type LoginStatus } from '../../shared/constants';
import LoginPage from '../LoginPage';

import Header from './Header';
import Sidebar from './Sidebar';

type Props = {
  children: React.Node
};

type PropsFromHOC = {
  loginStatus: LoginStatus,
  changeLoginStatus: (loginStatus: LoginStatus) => void
};

type RenderContent = ({ loginStatus: LoginStatus, children: React.Node }) => React.Node;
const renderContent: RenderContent = ({ children, loginStatus }) => {
  switch (loginStatus) {
    case LOGIN_STATUS.NOT_LOGIN: {
      return null;
    }
    case LOGIN_STATUS.LOGIN_SUCCESS: {
      return (
        <Layout>
          <Sidebar />
          {children}
        </Layout>
      );
    }
    case LOGIN_STATUS.LOGIN_FAIL:
    default: {
      return <LoginPage loginStatus={loginStatus} />;
    }
  }
};

const App = ({ children, loginStatus }: Props & PropsFromHOC) => (
  <Layout>
    <Header />
    {renderContent({
      children,
      loginStatus
    })}
  </Layout>
);

const hoc: HOC<*, Props> = compose(
  graphql(changeLoginStatusGQL),
  graphql(getPlaceholderGQL),
  withProps(({ data: { placeholder }, mutate }) => ({
    requestSuccess: placeholder === null,
    changeLoginStatus: async _loginStatus => {
      await mutate({
        variables: {
          loginStatus: _loginStatus
        }
      });
    }
  })),
  lifecycle({
    componentDidMount() {
      const { requestSuccess, changeLoginStatus } = this.props;
      if (requestSuccess) {
        changeLoginStatus(LOGIN_STATUS.LOGIN_SUCCESS);
      }
    },
    componentDidUpdate(prevProps) {
      const { requestSuccess, changeLoginStatus } = this.props;
      const { requestSuccess: prevRequestSucess } = prevProps;
      if (requestSuccess !== prevRequestSucess && requestSuccess) {
        changeLoginStatus(LOGIN_STATUS.LOGIN_SUCCESS);
      }
    }
  }),
  graphql(getLoginStatusGQL),
  withProps(({ data: { loginStatus } }) => ({
    loginStatus
  }))
);

export default hoc(App);

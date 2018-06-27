// @flow
import * as React from 'react';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';

import TimeAndSalaryView from './views/TimeAndSalaryView';
import WorkExperienceView from './views/WorkExperienceView';
import InterviewView from './views/InterviewView';

const { Header, Content, Sider } = Layout;

type Props = {
}

type State = {
  view: ?string,
}

const getComponent = (view) => {
  switch (view) {
    case 'TimeAndSalaryView': return TimeAndSalaryView;
    case 'WorkExperienceView': return WorkExperienceView;
    case 'InterviewView': return InterviewView;
    default: return () => null;
  }
};

class App extends React.Component<Props, State> {
  state = {
    view: null,
  }

  setView = (view: string) => {
    this.setState({ view });
  }

  render() {
    const View = getComponent(this.state.view);

    return (
      <Layout>
        <Header className="header" style={{ color: 'white' }}>
          <span>GoodJob Admin Page</span>
        </Header>
        <Layout>
          <Sider width={100} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              style={{ height: '100%', borderRight: 0 }}
            >
              <Menu.Item key="time-and-salary" onClick={() => this.setView('TimeAndSalaryView')}>工時薪資</Menu.Item>
              <Menu.Item key="work-experience" onClick={() => this.setView('WorkExperienceView')}>工作經驗</Menu.Item>
              <Menu.Item key="interview" onClick={() => this.setView('InterviewView')}>面試經驗</Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 'calc(100vh - 88px)' }}>
              <View />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default App;

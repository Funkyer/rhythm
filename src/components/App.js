import React, { Component } from 'react';
import { Layout } from 'antd';

const Header = Layout.Header;
const Content = Layout.Content;
const Footer = Layout.Footer;

class App extends Component {
  render() {
    return (
      <Layout>
        <Header>header</Header>
        <Content>main content</Content>
        <Footer>footer</Footer>
      </Layout>
    );
  }
}

export default App;
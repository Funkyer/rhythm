import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import MusicPlayer from './MusicPlayer';

const { Header, Content, Footer} = Layout;

class App extends Component {
  constructor(){
    super();
    this.state = {
      tracks: []
    };
  }
  getMusicList(id){
    id = 159311553;
    fetch(`http://music.163.com/api/playlist/detail?id=${id}`, {
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }).then(res => {
      if(res.result && res.result.tracks){
        this.setState({
          tracks: res.result.tracks
        });
      }
    });
  }
  componentWillMount(){
    // TODO 网易云音乐接口不支持跨域，可以从java或者node服务转发
    // this.getMusicList();
  }
  render() {
    let now = new Date();

    return (
      <Layout>
        <Header>
          <div className='logo' />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px', height: '64px' }}
          >
            <Menu.Item key="1">首页</Menu.Item>
          </Menu>
        </Header>
        <Content>
          <MusicPlayer tracks={this.state.tracks} />
        </Content>
        <Footer
          style={{ textAlign: 'center' }}
        >
          Funky &copy;{now.getFullYear()} Created by <a href="https://github.com/Funkyer">Funkyer</a>
        </Footer>
      </Layout>
    );
  }
}

export default App;
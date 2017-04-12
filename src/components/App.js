import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import MusicPlayer from './MusicPlayer';
import { Link } from 'react-router-dom';

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
    fetch('/MSP/PlayVod', {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      return res.json();
    }).then(data => {
      if(data.code === '000000'){
        this.setState({
          tracks: [{...data}]
        });
      }
    }).catch(data => {
      this.setState({
        tracks: [
          {
            name: 'Setting Fire',
            artists: ['The Chainsmokers', 'XYLØ'],
            duration: 247426,
            albumPic: 'http://p4.music.126.net/-47PRcZuv9C1_bysgyusFw==/18703792301030795.jpg',
            mp3Url: 'http://m2.music.126.net/cAMNpB3wflIfyipYLbpP7A==/3438172875449896.mp3'
          }, {
            name: 'Haunted',
            artists: ['Stwo', 'Sevdaliza'],
            duration: 207835,
            albumPic: 'http://p3.music.126.net/rwhvn_tqelnJiDnx0xNbxA==/3406287023700550.jpg',
            mp3Url: 'http://m2.music.126.net/TC-aKRFifqJn7tdDYWOWVQ==/1378787589021873.mp3'
          }, {
            name: 'Good Vibe',
            artists: ['Strobe!', 'Nyla'],
            duration: 203467,
            albumPic: 'http://p3.music.126.net/T1P4TMTR29PFaTI-0FLESw==/18216708649468849.jpg',
            mp3Url: 'http://m2.music.126.net/v2qpCjEFUJfvqIzJGXQhfg==/18543263603586808.mp3'
          }, {
            name: 'Paris',
            artists: ['The Chainsmokers'],
            duration: 221520,
            albumPic: 'http://p4.music.126.net/QgtucaYjslBBqxOQy2sDvA==/18608134790196527.jpg',
            mp3Url: 'http://m2.music.126.net/ks7-hkwAlixXDSBKaqmgSQ==/18679603046608682.mp3'
          }, {
            name: 'Super Bass',
            artists: ['Nicki Minaj'],
            duration: 200229,
            albumPic: 'http://p4.music.126.net/B91T1B3bcujyYvis1i78pA==/560750930174288.jpg',
            mp3Url: 'http://m2.music.126.net/x5AuRgiKcI5DKLXtFY16sQ==/1077521395220706.mp3'
          }
        ]
      });
    });
  }
  componentWillMount(){
    //this.getMusicList();
    this.setState({
        tracks: [
          {
            name: 'Setting Fire',
            artists: ['The Chainsmokers', 'XYLØ'],
            duration: 247426,
            albumPic: 'http://p4.music.126.net/-47PRcZuv9C1_bysgyusFw==/18703792301030795.jpg',
            mp3Url: 'http://m2.music.126.net/cAMNpB3wflIfyipYLbpP7A==/3438172875449896.mp3'
          }, {
            name: 'Haunted',
            artists: ['Stwo', 'Sevdaliza'],
            duration: 207835,
            albumPic: 'http://p3.music.126.net/rwhvn_tqelnJiDnx0xNbxA==/3406287023700550.jpg',
            mp3Url: 'http://m2.music.126.net/TC-aKRFifqJn7tdDYWOWVQ==/1378787589021873.mp3'
          }, {
            name: 'Good Vibe',
            artists: ['Strobe!', 'Nyla'],
            duration: 203467,
            albumPic: 'http://p3.music.126.net/T1P4TMTR29PFaTI-0FLESw==/18216708649468849.jpg',
            mp3Url: 'http://m2.music.126.net/v2qpCjEFUJfvqIzJGXQhfg==/18543263603586808.mp3'
          }, {
            name: 'Paris',
            artists: ['The Chainsmokers'],
            duration: 221520,
            albumPic: 'http://p4.music.126.net/QgtucaYjslBBqxOQy2sDvA==/18608134790196527.jpg',
            mp3Url: 'http://m2.music.126.net/ks7-hkwAlixXDSBKaqmgSQ==/18679603046608682.mp3'
          }, {
            name: 'Super Bass',
            artists: ['Nicki Minaj'],
            duration: 200229,
            albumPic: 'http://p4.music.126.net/B91T1B3bcujyYvis1i78pA==/560750930174288.jpg',
            mp3Url: 'http://m2.music.126.net/x5AuRgiKcI5DKLXtFY16sQ==/1077521395220706.mp3'
          }
        ]
      });
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
            <Menu.Item key="1"><Link to="/">首页</Link></Menu.Item>
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
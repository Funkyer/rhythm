import React, { Component } from 'react';
import TrackInfo from './TrackInfo';
import Progress from './Progress';
import AlbumPic from './AlbumPic';
import Controls from './Controls';
import Time from './Time';
import Volume from './Volume';
import CycleMode from './CycleMode';

class MusicPlayer extends Component {
  constructor(props) {
    super(props);
    this.play = this.play.bind(this);
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
    this.customPlay = this.customPlay.bind(this);
    this.unClock = this.unClock.bind(this);
    this.updateCurrentTime = this.updateCurrentTime.bind(this);
    this.setVolume = this.setVolume.bind(this);
    this.switchMode = this.switchMode.bind(this);
    this.state = {
      currentTrackLen: this.props.tracks.length,
      currentTrackIndex: 0,
      currentTime: 0,
      currentTotalTime: 0,
      playStatus: true,
      currentVolume: 1,
      cycleMode: 0,
      lock: true,
    };
  }
  updatePlayStatus() {
    if (this.state.playStatus) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
    this.setState({
      currentTotalTime: this.props.tracks[this.state.currentTrackIndex].duration / 1000
    });
  }
  play() {
    this.setState(prevStat => {
      return {
        playStatus: !prevStat.playStatus
      };
    }, () => {
      this.updatePlayStatus();
    });
  }
  customPlay(progress) {
    this.setState(prevStat => {
      return {
        currentTime: parseFloat(prevStat.currentTotalTime * progress)
      };
    }, () => {
      if(this.audio.fastSeek){
        this.audio.fastSeek(this.state.currentTime);
      }else{
        this.audio.currentTime = this.state.currentTime;
      }
      this.clock();
    });
  }
  previous() {
    let index = this.state.currentTrackIndex;
    switch (this.state.cycleMode) {
      case 0:
        // 循环
        index--;
        if(index < 0) index = this.state.currentTrackLen - 1;
        break;
      case 1:
        // 随机
        while(index === this.state.currentTrackIndex){
          index = Math.floor(Math.random() * this.state.currentTrackLen);
        }
        break;
      case 2:
        // 单曲循环
        break;
      default:
    }
    this.setState(prevStat => {
      let newState = {
        currentTrackIndex: index
      };
      if(index === prevStat.currentTrackIndex) newState.currentTime = 0;
      return newState;
    }, () => {
      this.audio.currentTime = 0;
      this.updatePlayStatus();
    });
  }
  next() {
    let index = this.state.currentTrackIndex;
    switch (this.state.cycleMode) {
      case 0:
        // 循环
        index++;
        if(index >= this.state.currentTrackLen) index = 0;
        break;
      case 1:
        // 随机
        while(index === this.state.currentTrackIndex){
          index = Math.floor(Math.random() * this.state.currentTrackLen);
        }
        break;
      case 2:
        // 单曲循环
        break;
      default:
        // 循环
        index++;
        if(index >= this.state.currentTrackLen) index = 0;
    }
    this.setState(prevStat => {
      let newState = {
        currentTrackIndex: index
      };
      if(index === prevStat.currentTrackIndex) newState.currentTime = 0;
      return newState;
    }, () => {
      this.audio.currentTime = 0;
      this.updatePlayStatus();
    });
  }
  componentDidMount() {
    this.updatePlayStatus();
    this.clock();
  }
  setVolume(volume){
    this.setState({
      currentVolume: volume
    }, () => {
      this.audio.volume = this.state.currentVolume;
    });
  }
  clock() {
    if(this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.setState({
        currentTime: this.audio.currentTime
      }, () => {
        if (this.state.currentTime >= this.state.currentTotalTime) {
          this.next();
        }
      });
    }, 300);
  }
  updateCurrentTime(progress) {
    this.setState({
      currentTime: parseFloat(this.state.currentTotalTime * progress)
    });
  }
  unClock() {
    clearInterval(this.timer);
  }
  switchMode(){
    this.setState(prevStat => {
      let nextMode = prevStat.cycleMode + 1;
      if(nextMode > 2) nextMode = 0;
      return {
        cycleMode: nextMode 
      };
    });
  }
  componentWillUnmount() {
    this.unClock();
  }
  render() {
    let track = this.props.tracks[this.state.currentTrackIndex];
    return (
      <div className="music-player">
        <Controls
          playing={this.state.playStatus}
          onPlay={this.play}
          onPrevious={this.previous}
          onNext={this.next}
        />
        <AlbumPic track={track} />
        <div className="track-progress">
          <TrackInfo track={track} />
          <div className="progress-time">
            <Progress
              progress={`${this.state.currentTotalTime ? (this.state.currentTime / this.state.currentTotalTime * 100) : 0}%`}
              customPlay={this.customPlay}
              unClock={this.unClock}
              updateCurrentTime={this.updateCurrentTime}
            />
            <Time
              currentTime={this.state.currentTime}
              currentTotalTime={this.state.currentTotalTime}
            />
          </div>
        </div>
        <Volume currentVolume={this.state.currentVolume} setVolume={this.setVolume} />
        <CycleMode cycleMode={this.state.cycleMode} switchMode={this.switchMode} />
        <audio
          id="funkyPlayer"
          ref={(audio) => { this.audio = audio; }}
          src={track && track.mp3Url}
          volume={this.state.currentVolume}
        ></audio>
      </div>
    );
  }
}

export default MusicPlayer;
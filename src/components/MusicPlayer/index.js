import React, { Component } from 'react';
import TrackInfo from './TrackInfo';
import Progress from './Progress';
import Controls from './Controls';
import Time from './Time';

class MusicPlayer extends Component {
  constructor(props) {
    super(props);
    this.play = this.play.bind(this);
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
    this.state = {
      currentTrackLen: this.props.tracks.length,
      currentTrackIndex: 0,
      currentTime: 0,
      currentTotalTime: 0,
      playStatus: true
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
    this.setState({
      playStatus: !this.state.playStatus
    }, () => {
      this.updatePlayStatus();
    });
  }
  previous() {
    if (this.state.currentTrackIndex - 1 < 0) {
      alert('已经没用上一首了');
    } else {
      this.setState({
        currentTrackIndex: --this.state.currentTrackIndex
      }, () => {
        this.updatePlayStatus();
      });
    }
  }
  next() {
    if (this.state.currentTrackIndex + 1 >= this.state.currentTrackLen) {
      alert('已经没用下一首了');
    } else {
      this.setState({
        currentTrackIndex: ++this.state.currentTrackIndex
      }, () => {
        this.updatePlayStatus();
      });
    }
  }
  componentDidMount() {
    if(!this.props.tracks.length){
      return;
    }
    this.updatePlayStatus();
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
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    let track = this.props.tracks[this.state.currentTrackIndex];
    return (
      <div className="music-player">
        <div className="player-header">Funkyer音乐播放器</div>
        <TrackInfo track={track} />
        <Progress progress={`${this.state.currentTotalTime ? (this.state.currentTime / this.state.currentTotalTime * 100) : 0}%`} />
        <Controls
          playing={this.state.playStatus}
          onPlay={this.play}
          onPrevious={this.previous}
          onNext={this.next}
        />
        <Time
          currentTime={this.state.currentTime}
          currentTotalTime={this.state.currentTotalTime}
        />
        <audio
          id="funkyPlayer"
          ref={(audio) => { this.audio = audio; }}
          src={track && track.mp3Url}
        ></audio>
      </div>
    );
  }
}

export default MusicPlayer;
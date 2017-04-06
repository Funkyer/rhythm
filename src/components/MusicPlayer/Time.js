import React, { Component } from 'react';

class Time extends Component {
  timeConvert(timestamp){
    let minutes = Math.floor(timestamp / 60);
    let seconds = Math.floor(timestamp - (minutes * 60));

    if(minutes < 10) minutes = `0${minutes}`;
    if(seconds < 10) seconds = `0${seconds}`;

    return `${minutes}:${seconds}`;
  }
  render(){
    return (
      <div className="time">
        <div className="current">{this.timeConvert(this.props.currentTime)}</div>
        <div className="total">{this.timeConvert(this.props.currentTotalTime)}</div>
      </div>
    );
  }
}

export default Time;
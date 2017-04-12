import React, { Component } from 'react';

class TrackInfo extends Component {
  static defaultProps = {
    track: {}
  };
  render(){
    let track = this.props.track;
    return (
      <div className="track-info">
        <div className="name">{track && track.name}</div>
        <div className="artist">{track && track.artists && track.artists.join('/')}</div>
      </div>
    );
  }
}

export default TrackInfo;
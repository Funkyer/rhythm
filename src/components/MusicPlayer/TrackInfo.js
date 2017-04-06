import React, { Component } from 'react';

class TrackInfo extends Component {
  static defaultProps = {
    track: {}
  };
  render(){
    let album = this.props.track.album;
    let artist = this.props.track.artists && this.props.track.artists[0];
    return (
      <div>
        <div
          className="album-pic"
          style={{ backgroundImage: `url(${album && album.picUrl})`}}
        >
        </div>
        <div className="track-info">
          <div className="name">{this.props.track.name}</div>
          <div className="artist">{artist && artist.name}</div>
          <div className="album">{album && album.name}</div>
        </div>
      </div>
    );
  }
}

export default TrackInfo;
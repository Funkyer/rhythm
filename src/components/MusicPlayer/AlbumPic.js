import React, { Component } from 'react';

class AlbumPic extends Component{
  render(){
    let albumPic = '';
    if(this.props.track && this.props.track.albumPic) albumPic = this.props.track.albumPic;
    return (
      <div className="album-pic" style={{ backgroundImage: albumPic }} />
    );
  }
}

export default AlbumPic;
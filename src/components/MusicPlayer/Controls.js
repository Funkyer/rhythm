import React, { Component } from 'react';
import { Icon } from 'antd';

class Controls extends Component {
  render(){
    let className;
    className = this.props.playing ? 'pause' : 'caret-right';
    return (
      <div className="controls">
        <div className="previous" onClick={this.props.onPrevious}>
          <Icon type="fast-backward" />
        </div>
        <div className="play" onClick={this.props.onPlay}>
          <Icon type={className} />
        </div>
        <div className="next" onClick={this.props.onNext}>
          <Icon type="fast-forward" />
        </div>
      </div>
    );
  }
}

export default Controls;
import React, { Component } from 'react';
import { Icon } from 'antd';

class Volume extends Component{
  constructor(props){
    super(props);
    this.state = {
      showing: false,
      height: this.props.currentVolume * 90
    };
    this.toggleVolume = this.toggleVolume.bind(this);
    this.mouseDown = this.mouseDown.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
  }
  toggleVolume(){
    this.setState(prevState => {
      return {
        showing: !prevState.showing
      };
    });
  }
  mouseDown(evt){
    evt.persist();
    this.dragging = true;
    this.curY = evt.clientY;
  }
  mouseMove(evt){
    if(!this.dragging) return;
    evt.persist();
    let disY = this.curY - evt.clientY,
      curHeight = parseFloat(this.cur.style.height) + disY;
    if(curHeight <= 0) curHeight = 0;
    if(curHeight >= 90) curHeight = 90;
    this.props.setVolume(curHeight / 90);
    this.cur.style.height = `${curHeight}px`; 
    this.curY = evt.clientY;
  }
  mouseUp(){
    this.dragging = false;
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      height: nextProps.currentVolume * 90
    });
  }
  render(){
    return (
      <div className="volume-ctrl" onMouseMove={this.mouseMove} onMouseUp={this.mouseUp}>
        <div className="volume-bg" style={{ display: this.state.showing ? 'block': 'none'}}>
          <div className="volume-bar">
            <div className="bar-cur" style={{height: this.state.height}} ref={cur => {this.cur = cur}}>
              <div className="btn" onMouseDown={this.mouseDown} />
            </div>
          </div>
        </div>
        <Icon type="sound" onClick={this.toggleVolume} />
      </div>
    );
  }
}

export default Volume;
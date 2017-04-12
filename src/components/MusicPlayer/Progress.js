import React, { Component } from 'react';
import ReactDom from 'react-dom';

class Progress extends Component {
  constructor(props){
    super(props);
    this.startDrag = this.startDrag.bind(this);
    this.move = this.move.bind(this);
    this.drop = this.drop.bind(this);
    this.click = this.click.bind(this);

    this.state = {
      progress: this.props.progress
    };
  }
  startDrag(evt){
    evt.stopPropagation();
    evt.persist();
    this.dragging = true;
    this.fullWidth = ReactDom.findDOMNode(this.full).getBoundingClientRect().width;
    this.curWidth = ReactDom.findDOMNode(this.cur).getBoundingClientRect().width;
    this.curX = evt.clientX;
    // stop progress interval
    this.props.unClock();
  }
  move(evt){
    evt.persist();
    if(this.dragging){
      let nowX = evt.clientX,
        disX = nowX - this.curX;
      this.curWidth = this.curWidth + disX;
      this.curX = nowX;
      let newProgress = this.curWidth / this.fullWidth * 100;
      if(newProgress <= 0) newProgress = 0;
      if(newProgress >= 100) newProgress = 100;
      this.cur.style.width = `${newProgress}%`;
      this.props.updateCurrentTime(newProgress / 100);
    }
  }
  drop(){
    if(!this.dragging){
      return;
    }
    this.dragging = false;
    this.setState({
      progress: `${this.curWidth / this.fullWidth * 100}%`
    }, () => {
      this.props.customPlay(this.curWidth / this.fullWidth);
    });
  }
  click(evt){
    this.fullWidth = ReactDom.findDOMNode(this.full).getBoundingClientRect().width;
    let offsetX = evt.nativeEvent.offsetX;
    this.setState({
      progress: `${offsetX / this.fullWidth * 100}%`
    }, () => {
      this.props.customPlay(offsetX / this.fullWidth);
    });
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      progress: nextProps.progress
    });
  }
  render(){
    return (
      <div
        className="progress"
        ref={full => this.full = full}
        onMouseDown={this.click}
        onMouseMove={this.move}
        onMouseUp={this.drop}
      >
        <div className="cur" style={{width: this.state.progress}} ref={cur => this.cur = cur}>
          <span className="btn" onMouseDown={this.startDrag}>
            <i />
          </span>
        </div>
      </div>
    );
  }
}

export default Progress;
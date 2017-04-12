import React, { Component } from 'react';

class CycleMode extends Component{
  constructor(props){
    super(props);
    this.click = this.click.bind(this);
  }
  click(){
    this.props.switchMode();
  }
  render(){
    let MODES = ['循环', '随机', '单曲循环'];
    return (
      <div className="cycle-mode" onClick={this.click}>{MODES[this.props.cycleMode]}</div>
    );
  }
}

export default CycleMode;
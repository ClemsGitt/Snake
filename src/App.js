import React, {useState} from 'react';
import './App.css';
import SnakeBoard from './SnakeBoard.js';
import ModeAndSize from './ModeAndSize.js';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.handler = this.handler.bind(this)
    this.state = {
      horSize: '' ,
      verSize: '' ,
      hardcore: false
    };
  }

  handler(e){
    this.setState({
      horSize: e.horSizeChildren,
      verSize: e.verSizeChildren,
      hardcore: e.hardcoreChildren
    })
  }

  render(){
    return (
      <div className="App">
        <SnakeBoard horSize = {this.state.horSize} verSize={this.state.verSize} hardcore={this.state.hardcore}/>
        <ModeAndSize handler = {this.handler}/>
      </div>
    )
  }
}

export default App;

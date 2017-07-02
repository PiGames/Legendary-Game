import React from 'react'

export default class ThrowDice extends React.Component{
  constructor(){
    super()

    this.state = {
      throwResult: null
    }

  }
  onThrow(){
    const throwResult = Math.floor(Math.random()*100) + 1;
    this.props.socket.emit('throw dice', {throwResult, id: this.props.id});
    this.setState({throwResult});
  }
  closeThrowInfo(){
    this.props.socket.emit('close throw info', this.props.id);
    this.setState({throwResult: null});
  }
  render(){
    return (
      <div id="dice">
      <button disabled={this.state.throwResult!==null}onClick={this.onThrow.bind(this)}>Rzuć koścmi</button>
      {
        (this.state.throwResult!==null)?
        (
          <div>
          <h2>Wyrzuciłeś&nbsp;&nbsp;&nbsp;{this.state.throwResult}</h2>
          <button onClick={this.closeThrowInfo.bind(this)}>Zamknij</button>
          </div>
        ): null
      }
      </div>
    );
  }
}

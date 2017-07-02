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
    socket.emit('throw dice npc', throwResult);
    this.setState({throwResult});
  }
  closeThrowInfo(){
  socket.emit('close throw info npc');
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

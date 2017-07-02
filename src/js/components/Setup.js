import React from "react";
export default class Setup extends React.Component {
  startGame() {
    socket.emit( "game started" );
  }

  render() {
    const usersConnectedArray = this.props.usersConnected.map( ( userId ) => {
      return ( <div key={"connected-" + userId}>Użytkownik #{ userId }</div> );
    } );

    const usersReady = this.props.usersReady.map( ( userData ) => {
      return ( <div key={"done-" + userData.id}>{userData.name} (#{ userData.id })</div> );
    } );

    return (
      <div className="sheet-container" id="setupSheet">
        <h2>Połączeni użytkownicy</h2>
        {usersConnectedArray}
        <h2>Gotowi użytkownicy</h2>
        {usersReady}
        <button onClick={this.startGame} disabled={ usersConnectedArray.length !== usersReady.length || usersReady.length <= 0 }>Zacznij grę</button>
        <div className="sheet" />
      </div>
    );
  }
}

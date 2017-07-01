import React from "react";
import Setup from "./Setup";
import Users from "./Users";

export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      usersConnected: [],
      usersReady: [],
      hasGameStarted: false,
    };

    socket.on( "can create game", () => {
      socket.on( "users changed", ( data ) => {
        this.setState( { usersConnected: data.usersConnected } );
        this.setState( { usersReady: data.usersReady } );
      } );

      socket.on( "game started", ( data ) => {
        this.setState( { hasGameStarted: true } );
      } );
    } );
  }

  render() {
    let setup = ( <Setup usersConnected={this.state.usersConnected} usersReady={this.state.usersReady} /> );
    if ( this.state.hasGameStarted ) {
      setup = ( <Users usersReady={this.state.usersReady} /> );
    }

    return setup;
  }
}

import React from "react";
import Setup from "./Setup";
import Users from "./Users";
import StoryTeller from "./StoryTeller";

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
    if(!this.state.hasGameStarted){
      return (<Setup usersConnected={this.state.usersConnected} usersReady={this.state.usersReady} />);
    } else {
      return (
      <div>
        <Users usersReady={this.state.usersReady} />
        <StoryTeller/>
      </div>
    );
    }
  }
}

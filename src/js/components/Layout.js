import React from "react";
import CreateCharacter from "./CreateCharacter";
export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      currentView: "characterCreator",
      storyIndex: -1,
    }

    this.changeView = this.changeView.bind( this );

    this.socket = io();
    const socket = this.socket;
    socket.on( "assigned id", ( id ) => {
      socket.on( "game started", () => {
        this.changeView( "gameStarted" );
      } );

      socket.on( "game started", () => {
        this.changeView( "gameStarted" );
      } );

      socket.on( "scene change", ( index ) => {
        this.setState( { storyIndex: index } )
      } );

      socket.on( "game ended", ( index ) => {
        this.changeView( "gameEnded" )
      } );
    } );
  }

  changeView( viewName ) {
    this.setState( { currentView: viewName } );
  }

  render() {
    switch ( this.state.currentView ) {
      case "characterCreator": {
        return (
          <div>
            <CreateCharacter changeView={ this.changeView } socket={this.socket} />
          </div>
        );
      }
      case "waitingForStart": {
        return (
          <div>
            <strong>Waiting For Start</strong>
          </div>
        );
      }
      case "gameStarted": {
        return (
          <div>
            <strong>Game started ({ this.state.storyIndex })</strong>
          </div>
        );
      }
      case "gameEnded": {
        return (
          <div>
            <strong>Game ended ;(</strong>
          </div>
        );
      }
    }
  }
}

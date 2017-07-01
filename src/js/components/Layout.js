import React from "react";
import CreateCharacter from "./CreateCharacter";
export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      currentView: "characterCreator",
      storyIndex: -1,
      characterDetails: {},
    }

    this.changeView = this.changeView.bind( this );
    this.setCharacterDeatils = this.setCharacterDeatils.bind( this );

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

      socket.on( "user data changed", ( data ) => {
        if ( data.id === id ) {
          this.setCharacterDeatils( data );
        }
      } )
    } );
  }

  changeView( viewName ) {
    this.setState( { currentView: viewName } );
  }

  setCharacterDeatils( characterDetails ) {
    this.setState( { characterDetails } );
  }

  render() {
    switch ( this.state.currentView ) {
      case "characterCreator": {
        return (
          <div>
            <CreateCharacter setCharacterDeatils={ this.setCharacterDeatils } changeView={ this.changeView } socket={this.socket} />
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
            <p>{ JSON.stringify( this.state.characterDetails ) }</p>
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

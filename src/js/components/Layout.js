import React from "react";
import Users from './Users';

export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      currentView: "waitingForStart",
      storyIndex: -1,
      usersReady: []
    }

    this.changeView = this.changeView.bind( this );

    this.socket = io("", { query: "clinetType=host" });
    const socket = this.socket;
      socket.on( "game started", () => {
        this.changeView( "gameStarted" );
      } );

      socket.on( "scene change", ( index ) => {
        this.setState( { storyIndex: index } );
      } );

      socket.on( "users changed", (data ) => {
        this.setState({usersReady: data.usersReady});
      });

      socket.on( "game ended", ( index ) => {
        this.changeView( "gameEnded" )
      } );

      socket.on( "user data changed", ( data ) => {
        this.updateUsers(data);
      } )
  }

  changeView( viewName ) {
    this.setState( { currentView: viewName } );
  }

  updateUsers( data ) {
    const users = [...this.state.usersReady];
    const index = users.findIndex( item => item.id === data.id );
    users[index] = data;
    this.setState({usersReady: users});
  }

  render() {
    switch ( this.state.currentView ) {
      case "waitingForStart": {
        return (
          <Users users={this.state.usersReady}/>
        );
      }
      case "gameStarted": {
        return (
          <div>
            <strong>Game started ({ this.state.storyIndex })</strong>
            <Users users={this.state.usersReady}/>
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

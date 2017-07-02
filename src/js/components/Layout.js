import React from "react";
import Users from './Users';

export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      // currentView: "waitingForStart",
      currentView: "gameEnded",
      storyIndex: -1,
      usersReady: [],
      usersThrows: [],
      npcThrow: null
    }

    this.changeView = this.changeView.bind( this );

    this.socket = io( "", { query: "clinetType=host" } );
    const socket = this.socket;
      socket.on( "game started", () => {
        this.changeView( "gameStarted" );
      } );

      socket.on( "scene change", ( index ) => {
        this.playAudio(index);
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
      socket.on("throw dice", (data)=> {
        const usersThrows = [...this.state.usersThrows, data];
        this.setState({usersThrows});
      });
      socket.on("close throw info", (id)=>{
        const usersThrows = [...this.state.usersThrows];
        const index=usersThrows.findIndex(usr=>usr.id === id);
        usersThrows.splice(index, 1);
        this.setState({usersThrows});
      });
      socket.on("throw dice npc", (result)=>{
        this.setState({npcThrow: result});
      });
      socket.on( 'close throw info npc', () => {
        this.setState({npcThrow: null});
      })
  }
  playAudio(id){
    if(this.myAudio){
      this.myAudio.pause();
    }
    this.myAudio = new Audio(`desktop-static/sfx/${id}.mp3`);
    this.myAudio.addEventListener('ended', function() {
      this.currentTime = 0;
      this.play();
    }, false);
    this.myAudio.play();
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
        const backgrounds = [ 'forest.png', 'scena0.png', 'rynek.png', 'karczma.png', 'karczma.png', 'piwnica.png', 'piwnica.png', 'piwnica.png' ];
        return (
          <div>
            <Users users={this.state.usersReady} usersThrows={this.state.usersThrows}/>
            <div style={{backgroundImage: `url(/mobile-static/img/${backgrounds[ this.state.storyIndex + 1 ]})`}} className="background" />
            <div>{
              (this.state.npcThrow !== null )?
              (<div>NPC wyrzucił {this.state.npcThrow}</div>):
              null
            }</div>
          </div>
        );
      }
      case "gameEnded": {
        return (
          <div id="gameEnded">
            <h1>Twoja przygoda się zakończyła!</h1>
          </div>
        );
      }
    }
  }
}

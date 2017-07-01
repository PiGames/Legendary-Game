import React from "react";
import CreateCharacter from "./CreateCharacter";
export default class Layout extends React.Component {
  constructor() {
    super();
    this.socket = io();
    this.socket.on( "assigned id", ( id ) => {

    } );
  }

  render() {
    return (
      <div>
        <CreateCharacter socket={this.socket} />
      </div>
    );
  }
}

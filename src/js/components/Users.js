import React from "react";
import EditUser from "./EditUser";

export default class Users extends React.Component {
  constructor() {
    super();
    this.state = {
      isUserBeeingEdited: false,
      userBeeingEdited: {},
    };
  }

  editUser( id ) {
    this.setState( { isUserBeeingEdited: !this.state.isUserBeeingEdited, userBeeingEdited: this.props.usersReady.find( ( user ) => user.id === id ) } );
  }

  render() {
    const usersReady = this.props.usersReady.map( ( userData ) => {
      return ( <div key={"done-" + userData.id}>{userData.name} (#{ userData.id })<span onClick={() => { this.editUser( userData.id ) }}> edytuj</span></div> );
    } );

    return (
      <div>
        <h2>Gracze</h2>
        { usersReady }
        { this.state.isUserBeeingEdited ? <EditUser userData={ this.state.userBeeingEdited } /> : null }
      </div>
    );
  }
}

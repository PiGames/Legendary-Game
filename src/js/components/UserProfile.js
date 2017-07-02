import React from "react";
import EditUser from "./EditUser";

export default class Users extends React.Component {
  constructor() {
    super();
    this.state = {
      isUserBeeingEdited: false,
      userBeeingEdited: {},
    };

    this.editUser = this.editUser.bind( this );
  }

  editUser( id ) {
    this.setState( { isUserBeeingEdited: !this.state.isUserBeeingEdited, userBeeingEdited: this.props.userData } );
  }

  render() {
    const userData = this.props.userData;
    return (
      <div className="sheet-container">
        <div>
          <img className="character-image" src={`/mobile-static/img/${userData.class}_profile.png`} />
          <h2>{userData.name} (#{ userData.id })</h2>
          <button onClick={() => { this.editUser( userData.id ) }}>Edytuj</button>

          { this.state.isUserBeeingEdited ? <EditUser userData={ this.state.userBeeingEdited } /> : null }
        </div>
        <div className="sheet" />
      </div>
    );
  }
}

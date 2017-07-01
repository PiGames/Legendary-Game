import React from "react";
export default class Setup extends React.Component {
  editUser() {
    console.log( 1 );
  }

  render() {
    const usersReady = this.props.usersReady.map( ( userData ) => {
      return ( <div key={"done-" + userData.id}>{userData.name} (#{ userData.id })<span onClick={this.editUser}> edytuj</span></div> );
    } );

    return (
      <div>
        <h2>Gracze</h2>
        {usersReady}
      </div>
    );
  }
}

import React from "react";
import UserProfile from "./UserProfile";

export default class Users extends React.Component {
  render() {
    const usersReady = this.props.usersReady.map( ( userData ) => {
      return ( <UserProfile key={"done-" + userData.id} userData={userData}/> );
    } );

    return (
      <div className="section">
        <h2>Gracze</h2>
        { usersReady }
      </div>
    );
  }
}

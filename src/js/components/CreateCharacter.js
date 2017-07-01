import React from "react";

export default class CreateCharacter extends React.Component {
  constructor( props ) {
    super();
    this.formData = {};
    this.state = {
      formSent: false
    };
  }

  send() {
    let formData = {};
    for ( const key in this.formData ) {
      if ( this.formData.hasOwnProperty(key) ) {
        formData[ key ] = this.formData[ key ].value;
      }
    }

    this.setState( { formSent: true } );
    this.props.socket.emit( "user done", formData );
    return false;
  }

  render() {
    if ( this.id !== false ) {
      return (
        <div>
          <h2>Imię</h2>
          <input type="text" ref={ ( input ) => { this.formData.name = input } }/>
          <button disabled={ this.state.formSent } onClick={ this.send.bind( this ) }>Submit</button>
        </div>
      );
    } else {
      return null;
    }
  }
}

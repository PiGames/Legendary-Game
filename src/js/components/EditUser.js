import React from "react";
export default class EditUser extends React.Component {
  constructor( props ) {
    super();
    this.state = {
      skillValues: Object.assign( {}, props.userData.skills ),
      hp: props.userData.hp,
    };

    this.editUser = this.editUser.bind( this );
  }

  editUser( e ) {
    socket.emit( "user data changed", Object.assign( {}, this.props.userData, { skills: this.state.skillValues, hp: this.state.hp } ) );

    e.preventDefault();
    return false;
  }

  add( key ) {
    if ( key !== "hp" ) {
      const values = this.state.skillValues;

      values[ key ]++;

      this.setState( { skillValues: values } );
    } else {
      const value = Math.min( 100, this.state.hp + 1 );

      this.setState( { hp: value } );
    }
  }

  remove( key ) {
    if ( key !== "hp" ) {
      const values = this.state.skillValues;

      values[ key ] = Math.max( 0, values[ key ] - 1 );

      this.setState( { skillValues: values } );
    } else {
      const value = Math.max( 0, this.state.hp - 1 );

      this.setState( { hp: value } );
    }
  }

  render() {
    return (
      <form onSubmit={ this.editUser }>
        <h3>HP</h3><span>{ this.state.hp }</span><button type="button" onClick={ () => { this.add( "hp" ) } }>+</button><button type="button" onClick={ () => { this.remove( "hp" ) } }>-</button>

        <h3>Zręczność</h3><span>{ this.state.skillValues.agility }</span><button type="button" onClick={ () => { this.add( "agility" ) } }>+</button><button type="button" onClick={ () => { this.remove( "agility" ) } }>-</button>
        <h3>Inteligencja</h3><span>{ this.state.skillValues.inteligence }</span><button type="button" onClick={ () => { this.add( "inteligence" ) } }>+</button><button type="button" onClick={ () => { this.remove( "inteligence" ) } }>-</button>
        <h3>Siła</h3><span>{ this.state.skillValues.strength }</span><button type="button" onClick={ () => { this.add( "strength" ) } }>+</button><button type="button" onClick={ () => { this.remove( "strength" ) } }>-</button>
        <h3>Percepcja</h3><span>{ this.state.skillValues.perception }</span><button type="button" onClick={ () => { this.add( "perception" ) } }>+</button><button type="button" onClick={ () => { this.remove( "perception" ) } }>-</button>
        <h3>Charyzma</h3><span>{ this.state.skillValues.charisma }</span><button type="button" onClick={ () => { this.add( "charisma" ) } }>+</button><button type="button" onClick={ () => { this.remove( "charisma" ) } }>-</button>

        <button type="submit">Submit</button>
      </form>
    );
  }
}

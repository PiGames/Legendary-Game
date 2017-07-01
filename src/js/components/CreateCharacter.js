import React from "react";

export default class CreateCharacter extends React.Component {
  constructor( props ) {
    super();
    this.formData = {
      skills: {}
    };

    this.defaultSkills = {
      elf: {
        agility: 15,
        inteligence: 10,
        strength: 5,
        perception: 0,
        charisma: 20,
      },
      dwarf: {
        agility: 10,
        inteligence: 0,
        strength: 25,
        perception: 5,
        charisma: 10,
      },
      hobbit: {
        agility: 20,
        inteligence: 10,
        strength: 10,
        perception: 10,
        charisma: 0,
      }
    }

    this.state = {
      formSent: false,
      usedPoints: 0,
      skillValues: Object.assign( {}, this.defaultSkills.elf ),
      currentClass: "elf",
    };
  }

  send( e ) {
    let formData = {};
    for ( const key in this.formData ) {
      if ( this.formData.hasOwnProperty(key) ) {
        if ( key === 'class' ) {
          formData[ key ] = this.formData[ key ].selectedOptions[ 0 ].id;
        } else {
          formData[ key ] = this.formData[ key ].value;
        }
      }
    }

    formData.skills = this.state.skillValues;
    formData.hp = 100;

    console.log( formData );

    this.setState( { formSent: true } );
    this.props.socket.emit( "user done", formData );
    this.props.setCharacterDeatils( formData );
    this.props.changeView( "waitingForStart" );

    e.preventDefault();
    return false;
  }

  classChanged( e ) {
    const defaultSkills = this.defaultSkills;

    const currentClass = e.target.selectedOptions[ 0 ].id;

    this.state.currentClass = currentClass;

    this.setState( { skillValues: defaultSkills[ currentClass ] } )
  }

  add( key ) {
    if ( this.canBeAdded() ) {
      const values = this.state.skillValues;

      values[ key ]++;

      this.setState( { skillValues: values } );
    }
  }

  remove( key ) {
    const values = this.state.skillValues;

    values[ key ] = Math.max( this.defaultSkills[ this.state.currentClass ][ key ], values[ key ] - 1 );

    this.setState( { skillValues: values } );
  }

  canBeAdded() {
    let sum = 0;
    for ( const key in this.state.skillValues ) {
      if ( this.state.skillValues.hasOwnProperty( key ) ) {
        sum += this.state.skillValues[ key ];
      }
    }

    if ( sum < 100 ) {
      return true;
    }
  }

  render() {
    let sum = 0;
    for ( const key in this.state.skillValues ) {
      if ( this.state.skillValues.hasOwnProperty( key ) ) {
        sum += this.state.skillValues[ key ];
      }
    }

    if ( this.id !== false ) {
      return (
        <form id="character-creator" onSubmit={ ( e ) => { this.send.call( this, e ) } } >
          <img className="character-image" src="http://unsplash.it/1920/1080" />
          <h2>Imię</h2>
          <input type="text" ref={ ( input ) => { this.formData.name = input } } required />
          <h2>Klasa</h2>
          <select onChange={ ( e ) => this.classChanged.call( this, e ) } ref={ ( select ) => { this.formData.class = select } }>
            <option id="elf">Elf</option>
            <option id="dwarf">Krasnolud</option>
            <option id="hobbit">Niziołek</option>
          </select>
          <h2>Umiejętności</h2>

          <h3>Pozostało punktów umiejętności:<br /><span>{100 - sum}</span></h3>
          <h3>Zręczność</h3>
            <span>{ this.state.skillValues.agility }</span>
            <button type="button" onClick={ () => { this.remove( "agility" ) } }>-</button>
            <button type="button" onClick={ () => { this.add( "agility" ) } }>+</button>
          <h3>Inteligencja</h3>
            <span>{ this.state.skillValues.inteligence }</span>
            <button type="button" onClick={ () => { this.remove( "inteligence" ) } }>-</button>
            <button type="button" onClick={ () => { this.add( "inteligence" ) } }>+</button>
          <h3>Siła</h3>
            <span>{ this.state.skillValues.strength }</span>
            <button type="button" onClick={ () => { this.remove( "strength" ) } }>-</button>
            <button type="button" onClick={ () => { this.add( "strength" ) } }>+</button>
          <h3>Percepcja</h3>
            <span>{ this.state.skillValues.perception }</span>
            <button type="button" onClick={ () => { this.remove( "perception" ) } }>-</button>
            <button type="button" onClick={ () => { this.add( "perception" ) } }>+</button>
          <h3>Charyzma</h3>
            <span>{ this.state.skillValues.charisma }</span>
            <button type="button" onClick={ () => { this.remove( "charisma" ) } }>-</button>
            <button type="button" onClick={ () => { this.add( "charisma" ) } }>+</button>

          <br />
          <button disabled={ this.state.formSent } type="submit">Dołącz</button>
          <div className="sheet" />
        </form>
      );
    } else {
      return null;
    }
  }
}

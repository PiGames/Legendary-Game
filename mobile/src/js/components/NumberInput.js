import React from "react";

export default class NumberInput extends React.Component {
  constructor( props ) {
    super();
    this.state = {
      value: props.defaultValue,
    };

    this.input = {};

    this.canPointBeAdded = props.canPointBeAdded;
  }

  remove() {
    this.props.canBeAdded( -1 );

    this.setState( { value: Math.min( 100, Math.max( this.props.defaultValue, this.state.value - 1 ) ) } );
  }

  add() {
    if ( this.props.canBeAdded() ) {
      this.setState( { value: Math.min( 100, Math.max( this.props.defaultValue, this.state.value + 1 ) ) } );
    }
  }

  render() {
    return (
      <div>
        <h3>Zręczność</h3><input ref={ ( input ) => { this.input = input } } value={this.state.value} type="text" readOnly /><button type="button" onClick={ this.remove.bind( this ) }>-</button><button type="button" onClick={ this.add.bind( this ) }>+</button>
      </div>
    )
  }
}

import React from "react";
import ThrowDice from './ThrowDice';


export default class CreateCharacter extends React.Component {
  render() {
    const characterDetails = this.props.characterDetails;
    return (
      <div id="gameStarted">
        <img className="character-image" src={`/mobile-static/img/${characterDetails.class}_profile.png`} />
        <div className="name">
          <h1>{ characterDetails.name }</h1>
        </div>
        <div className="skill">
          <h2>Zdrowie</h2>
          <span>{ characterDetails.hp }</span>
        </div>
        <div className="skill">
          <h2>Zręczność</h2>
          <span>{ characterDetails.skills.agility }</span>
        </div>
        <div className="skill">
          <h2>Inteligencja</h2>
          <span>{ characterDetails.skills.inteligence }</span>
        </div>
        <div className="skill">
          <h2>Siła</h2>
          <span>{ characterDetails.skills.strength }</span>
        </div>
        <div className="skill">
          <h2>Percepcja</h2>
          <span>{ characterDetails.skills.perception }</span>
        </div>
        <div className="skill">
          <h2>Charyzma</h2>
          <span>{ characterDetails.skills.charisma }</span>
        </div>
        <div className="sheet"/>
        <ThrowDice id={this.props.id} socket={this.props.socket}/>
      </div>
    );
  }
}

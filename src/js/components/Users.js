import React from 'react'

const Users = ( { users } ) => (
  <div id="users-container">
    {
      users.map((usr, id)=>(
        <div className="card" key={id}>
          <img src={`/mobile-static/img/${usr.class}_profile.png`} className="character-image" />
          <div className="name">
            <h1>{ usr.name }</h1>
          </div>
          <div className="skill">
            <h2>Zdrowie</h2>
            <span>{ usr.hp }</span>
          </div>
          <div className="skill">
            <h2>Zręczność</h2>
            <span>{ usr.skills.agility }</span>
          </div>
          <div className="skill">
            <h2>Inteligencja</h2>
            <span>{ usr.skills.inteligence }</span>
          </div>
          <div className="skill">
            <h2>Siła</h2>
            <span>{ usr.skills.strength }</span>
          </div>
          <div className="skill">
            <h2>Percepcja</h2>
            <span>{ usr.skills.perception }</span>
          </div>
          <div className="skill">
            <h2>Charyzma</h2>
            <span>{ usr.skills.charisma }</span>
          </div>
          <div className="sheet"></div>
        </div>
        )
      )
    }
  </div>
)

export default Users;

// {
//   users.map((usr, id)=>(
//     <div key={id}>
//       <div>Imie: {usr.name}</div>
//       <div>Klasa: {usr.class}</div>
//       <div>Zręczność: {usr.skills.agility}</div>
//       <div>Charyzma: {usr.skills.charisma}</div>
//       <div>Inteligencja: {usr.skills.inteligence}</div>
//       <div>Percepcja: {usr.skills.perception}</div>
//       <div>Siła: {usr.skills.strength}</div>
//       <div>Punkty żywotności: {usr.hp}</div>
//       <div className="sheet" />
//     </div>
//   )
// )
// }

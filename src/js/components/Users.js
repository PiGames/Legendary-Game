import React from 'react'

const Users = ({users}) => (
  <ul>
    {
      users.map((usr, id)=>(
        <li key={id}>
        <div>Imie: {usr.name}</div>
        <div>Klasa: {usr.class}</div>
        <div>Zręczność: {usr.skills.agility}</div>
        <div>Charyzma: {usr.skills.charisma}</div>
        <div>Inteligencja: {usr.skills.inteligence}</div>
        <div>Percepcja: {usr.skills.perception}</div>
        <div>Siła: {usr.skills.strength}</div>
        <div>Punkty żywotności: {usr.hp}</div>
        </li>
        )
      )
    }
  </ul>
)

export default Users;

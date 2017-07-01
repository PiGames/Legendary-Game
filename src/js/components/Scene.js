import React from "react";

const Scene = ({scene}) => (
 <div>
  <div>
  {scene.place}
  </div>
  <div>
  {scene.description}
  </div>
  <ul>
  {
    scene.characters.map( (character, index)=>(
      <li key={index}>
        <div>
          {character.name}
        </div>
        <div>
          {character.description}
        </div>
      </li>
      )
    )
  }
  </ul>
 </div>
);

export default Scene;

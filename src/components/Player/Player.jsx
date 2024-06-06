import { useState } from 'react';
import './Player.css'
export default function Player({ initialName, symbol }) {
  //We can use multiple state functions to create more dynamic code
  const [playerName, setPlayerName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);

  function handleEdit(){
    //A best practice for updating a boolean state value is to use arrow function form
    setIsEditing((editing) => !editing);
  };

  //Two way binding allows us to listen to a change and feedback the value into the input 
  function handleChange(event){
    setPlayerName(event.target.value);
  }

  let editPlayerName = <span className="player-name">{playerName}</span>;

  if (isEditing) {
    editPlayerName = <input type="text" required value={playerName} onChange={handleChange}/>;
  }

  return (
    <li>
      <span className="player">
        {editPlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      {/* We should use state management to allow edit to say save when done editing */}
      <button onClick={handleEdit}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
  );
}

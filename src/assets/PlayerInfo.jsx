import { useState } from "react";
export default function Player({ name, sym }) {
  const [isEditing, setIsEditing] = useState(false);
  const [pName, setName] = useState(name);
  function editing() {
    setIsEditing((edit) => !edit);
  }
  function editName(newName) {
    setName(newName.target.value);
  }

  let nameEdit = <span className="player-name">{pName}</span>;
  if (isEditing) {
    nameEdit = (
      <input type="text" defaultValue={pName} onChange={editName}></input>
    );
  }
  return (
    <li>
      <span className="player">
        {nameEdit}
        <span className="player-symbol">{sym}</span>
        <button onClick={editing}>{isEditing ? "Save" : "Edit"}</button>
      </span>
    </li>
  );
}

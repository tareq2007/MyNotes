import React from 'react'
import { Link } from 'react-router-dom'

let getDate = (note)=>{
  return new Date(note.updated).toLocaleDateString()
}

const ListItem = ({note}) => {
  
  return (
    <Link to={`/notes/${note.id}`} className="list-item">
        <div className="notes-list-item">
          <h2>{note.body}</h2>
          <p>{getDate(note)}</p>
        </div>
    </Link>
  )
}

export default ListItem
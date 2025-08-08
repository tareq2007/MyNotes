import React, { useEffect, useState } from 'react'
import ListItem from '../components/ListItem'
import { Link } from 'react-router-dom'
import {ReactComponent as AddIcon} from '../assets/add.svg'

const NotesListPages = () => {

let [notes, setNotes] = useState([])


useEffect(()=> {
    getNotes()
},[])

let getNotes = async() => {
    let response= await fetch('http://localhost:8000/notes')
    let data = await response.json()
    setNotes(data)
    
}

  return (
    <div className="notes">
      <div className='notes-header'>
        <h2 className='notes-title'>&#9782; Notes</h2>
        <p className='notes-count'>{notes.length} {notes.length === 1 ? 'Note' : 'Notes'}</p>
      </div>
      <Link to="/notes/new" className="floating-button"> {<AddIcon/>} </Link>

      <div className='notes-list'>
          {notes.map((note,index) => (
              <ListItem key={index} note={note} />
      
            ))}
      </div>
    </div>
  )
}
export default NotesListPages
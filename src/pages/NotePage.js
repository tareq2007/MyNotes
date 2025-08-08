import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const NotePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const textareaRef = useRef(null);

  const [note, setNote] = useState({ body: '' });

  useEffect(() => {
    if (id === 'new') {
      setNote({ body: '' });
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 0);
    } else {
      fetchNote();
    }
  }, [id]);

  const fetchNote = async () => {
    const response = await fetch(`http://localhost:8000/notes/${id}`);
    const data = await response.json();
    setNote(data);
  };

  const createNote = async () => {
    await fetch(`http://localhost:8000/notes/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...note, updated: new Date().toISOString() }),
    });
  };

  const updateNote = async () => {
    await fetch(`http://localhost:8000/notes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...note, updated: new Date().toISOString() }),
    });
  };

  const deleteNote = async () => {
    await fetch(`http://localhost:8000/notes/${id}`, {
      method: 'DELETE',
    });
    navigate('/');
  };

  const handleSubmit = async () => {
    if (id !== 'new' && (!note.body || !note.body.trim())) {
      await deleteNote();
    } else if (id === 'new' && note?.body?.trim()) {
      await createNote();
    } else if (id !== 'new') {
      await updateNote();
    }
    navigate('/');
  };

  // Remove this or comment it out:
  // const handleKeyDown = (e) => {
  //   if (e.key === 'Enter' && !e.shiftKey) {
  //     e.preventDefault(); // prevent newline
  //     handleSubmit();
  //   }
  // };

  if (!note) return <h2>Loading...</h2>;

  return (
    <div className="note">
      <div className="note-header">
        <button onClick={() => navigate('/')} className="back-btn">Back</button>
        {id !== 'new' && (
          <button onClick={deleteNote}>Delete</button>
        )}
        <button onClick={handleSubmit} className="done-btn">Done</button>  {/* New Done button */}
      </div>
      <textarea
        ref={textareaRef}
        value={note.body}
        onChange={(e) => setNote({ ...note, body: e.target.value })}
        placeholder="Write your note here..."
        // onKeyDown={handleKeyDown}  // Removed Enter submit
        rows={10}
      />
    </div>
  );
};

export default NotePage;

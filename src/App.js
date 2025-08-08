import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import './App.css';   
import Header from './components/Header';
import NotesListPages from './pages/NotesListPages';
import NotePage from './pages/NotePage';

function App() {
  return (
    <Router>
      <div className="container dark">
        <div className="app">
          <div>
            <Header />
            <Routes>
              <Route path="/" element={<NotesListPages />} />
              <Route path="/notes/:id" element={<NotePage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

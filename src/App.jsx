// src/App.js
import React, { useState } from 'react';
import SessionForm from './SessionForm';
import SessionTable from './SessionTable';
import './App.css';

const App = () => {
  const [sessions, setSessions] = useState([]);

  const handleSave = (sessionData) => {
    setSessions([...sessions, sessionData]);
    // setSessions((prevSessions) => [...prevSessions, sessionData]);
  };

  return (
    <div className="app">
      <SessionForm onSave={handleSave} />
      <SessionTable sessions={sessions} />
    </div>
  );
};

export default App;

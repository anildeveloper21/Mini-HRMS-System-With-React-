// src/components/SessionTable.js
import React from 'react';
import './App.css'

const SessionTable = ({ sessions }) => {
  return (
    <>
    <h2>List of Data</h2>
    <table className="session-table">
      <thead>
        <tr>
          <th>Session Date</th>
          <th>Session Time</th>
          <th>Total Sessions</th>
          <th>Session Interval</th>
          <th>Preferred Days</th>
          <th>Duration Per Session</th>
          <th>Last Session Date</th>
          <th>Last Session Time</th>
        </tr>
      </thead>
      <tbody>
        {sessions.map((session, index) => (
          <tr key={index}>
            <td>{session.sessionDate}</td>
            <td>{session.sessionTime}</td>
            <td>{session.totalSessions}</td>
            <td>{session.sessionInterval}</td>
            <td>{session.preferredDays}</td>
            <td>{session.durationPerSession}</td>
            <td>{session.lastSessionDate}</td>
            <td>{session.lastSessionTime}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  );
};

export default SessionTable;

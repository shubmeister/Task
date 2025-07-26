
import React, { useState } from 'react';
import db from './db';

const SQLQuery = () => {
  const [query, setQuery] = useState('SELECT * FROM patients;');
  const [results, setResults] = useState([]);

  const handleRun = async () => {
    try {
      const res = await db.query(query);
      setResults(res);
    } catch (e) {
      alert('Error: ' + e.message);
    }
  };

  return (
    <div>
      <h2>Run SQL Query</h2>
      <textarea value={query} onChange={e => setQuery(e.target.value)} rows="3" cols="50" />
      <br />
      <button onClick={handleRun}>Run</button>

      {results.length > 0 && (
        <table border="1">
          <thead>
            <tr>{Object.keys(results[0]).map((key) => <th key={key}>{key}</th>)}</tr>
          </thead>
          <tbody>
            {results.map((row, i) => (
              <tr key={i}>{Object.values(row).map((val, j) => <td key={j}>{val}</td>)}</tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SQLQuery;
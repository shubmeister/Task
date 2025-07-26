import React, { useEffect, useState } from 'react';
import db from './db';

const SQLQuery = () => {
  const [patients, setPatients] = useState([]);

  const fetchPatients = async () => {
    await db.load();
    const database = db.getDB();
    const res = database.exec('SELECT * FROM patients');

    if (res.length > 0) {
      const values = res[0].values;
      setPatients(values);
    }
  };

  useEffect(() => {
    fetchPatients();

    const channel = new BroadcastChannel('sync');
    channel.onmessage = (msg) => {
      if (msg.data === 'updated') {
        fetchPatients();
      }
    };

    return () => channel.close();
  }, []);

  return (
    <div>
      <h2>Patient Records</h2>
      <ul>
        {patients.map((row, i) => (
          <li key={i}>{row.join(', ')}</li>
        ))}
      </ul>
    </div>
  );
};

export default SQLQuery;
import React, { useEffect, useState } from 'react';
import db from './db';

const SQLQuery = () => {
  const [patients, setPatients] = useState([]);

  const fetchPatients = async () => {
    const data = await db.getAllPatients();
    setPatients(data);
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
      <h2>Registered Patients</h2>
      <ul>
        {patients.map((p, index) => (
          <li key={index}>
            {p.patientid} - {p.name} ({p.age}, {p.gender}) - {p.address}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SQLQuery;
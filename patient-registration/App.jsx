
import React, { useEffect } from 'react';
import PatientForm from './PatientForm';
import SQLQuery from './SQLQuery';
import db from './db'; 

const App = () => {
  useEffect(() => {
    const channel = new BroadcastChannel('sync');

    channel.onmessage = async (msg) => {
      if (msg.data === 'updated') {
        await db.load();
      }
    };


    return () => {
      channel.close();
    };
  }, []);

  return (
    <div>
      <h1>Patient Registration App</h1>
      <PatientForm />
      <hr />
      <SQLQuery />
    </div>
  );
};

export default App;
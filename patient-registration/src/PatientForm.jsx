import React, { useState } from 'react';
import db from './db';

const PatientForm = () => {
  const [form, setForm] = useState({
    patientid: '',
    name: '',
    age: '',
    gender: '',
    address: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await db.load();
    const database = db.getDB();

    database.run(`
      INSERT INTO patients (patientid, name, age, gender, address)
      VALUES (?, ?, ?, ?, ?)
    `, [
      form.patientid,
      form.name,
      parseInt(form.age),
      form.gender,
      form.address,
    ]);

    const channel = new BroadcastChannel('sync');
    channel.postMessage('updated');
    setForm({ patientid: '', name: '', age: '', gender: '', address: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="patientid" value={form.patientid} onChange={handleChange} placeholder="Patient ID" required /><br />
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required /><br />
      <input name="age" value={form.age} onChange={handleChange} placeholder="Age" required /><br />
      <input name="gender" value={form.gender} onChange={handleChange} placeholder="Gender" /><br />
      <input name="address" value={form.address} onChange={handleChange} placeholder="Address" /><br />
      <button type="submit">Register</button>
    </form>
  );
};

export default PatientForm;
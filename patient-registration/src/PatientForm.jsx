import React, { useState } from 'react';
import db from './db';

const PatientForm = () => {
  const [formData, setFormData] = useState({
    patientid: '',
    name: '',
    age: '',
    gender: '',
    address: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await db.insertPatient({
      ...formData,
      age: parseInt(formData.age),
      patientid: parseInt(formData.patientid),
    });

    const channel = new BroadcastChannel('sync');
    channel.postMessage('updated');
    channel.close();

    alert('Patient added!');
    setFormData({ patientid: '', name: '', age: '', gender: '', address: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="patientid" placeholder="Patient ID" value={formData.patientid} onChange={handleChange} required />
      <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
      <input name="age" placeholder="Age" value={formData.age} onChange={handleChange} required />
      <input name="gender" placeholder="Gender" value={formData.gender} onChange={handleChange} required />
      <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
      <button type="submit">Register</button>
    </form>
  );
};

export default PatientForm;
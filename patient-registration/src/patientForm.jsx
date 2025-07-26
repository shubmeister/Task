
import React, {useState} from 'react';
import db from './db';

const PatientForm = () => {

    const[patientid,setPatientid]=useState("");
    const[name,setName]=useState("");
    const[age,setAge]=useState("");
    const[gender,setGender]=useState("");
    const[address,setAddress]=useState("");

    const handleSubmit = async (e)=> {
        
        e.preventDefault();

        await db.exec(`INSERT INTO patients (patientid,name,age,gender,address) VALUES ('
            
            ${patientid},${name},${age},${gender},${address})`);

            alert("Patient registered");
            setPatientid("");
            setName("");
            setAge("");
            setGender("");
            setAddress("");
    };


    return(
      <form onSubmit={handleSubmit}>
        <h3>Register New Patient</h3>
        <input placeholder = "Patientid" value="patientid"
          onChange={e => setName(e.target.value)}
          required />
        <input placeholder = "Name" value="name"
          onChange={e => setName(e.target.value)}
          required />
        <input placeholder = "Age" value="age"
          onChange={e => setName(e.target.value)}
          required />
        <input placeholder = "Gender" value="gender"
          onChange={e => setName(e.target.value)}
          required />
        <input placeholder = "Address" value="address"
          onChange={e => setName(e.target.value)}
          required />

          <button type = "submit">Register</button>
      </form>
      );

   };

   export default PatientForm;
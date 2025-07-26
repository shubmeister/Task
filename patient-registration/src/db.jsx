import initSqlJs from 'sql.js';

let db = null;

const load = async () => {
  if (db) return;

  const SQL = await initSqlJs({
    locateFile: file => `/sql-wasm.wasm`, // important: load from public folder
  });

  db = new SQL.Database();

  db.run(`
    CREATE TABLE IF NOT EXISTS patients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      patientid INTEGER,
      name TEXT NOT NULL,
      age INTEGER,
      gender TEXT,
      address TEXT
    );
  `);
};

const insertPatient = ({ patientid, name, age, gender, address }) => {
  const stmt = db.prepare(`
    INSERT INTO patients (patientid, name, age, gender, address)
    VALUES (?, ?, ?, ?, ?)
  `);
  stmt.run([patientid, name, age, gender, address]);
  stmt.free();
};

const getAllPatients = () => {
  const result = db.exec('SELECT * FROM patients');
  if (result.length === 0) return [];

  const { columns, values } = result[0];
  return values.map(row => {
    const obj = {};
    columns.forEach((col, i) => {
      obj[col] = row[i];
    });
    return obj;
  });
};

export default {
  load,
  insertPatient,
  getAllPatients,
};

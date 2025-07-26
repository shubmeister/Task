import initSqlJs from 'sql.js';

let db;

const load = async () => {
  const SQL = await initSqlJs({
    locateFile: file => `https://sql.js.org/dist/${file}`
  });

  if (!db) {
    db = new SQL.Database();
    db.run(`
      CREATE TABLE IF NOT EXISTS patients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        patientid INTEGER,
        name TEXT NOT NULL,
        age INTEGER,
        gender TEXT,
        address TEXT
      )
    `);
  }

  return db;
};

export default {
  load: async () => {
    await load();
  },
  getDB: () => db
};
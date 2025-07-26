import {PGlite} from 'pg-lite';

const db = new PGlite;

await db.exec( `CREATE TABLE IF NOT EXISTS
    patients(

        id INTEGER PRIMARY KEY AUTOINCREMENT,
        patientid INTEGER;
        name TEXT NOT null;
        age INTEGER;
        gender TEXT;
        address TEXT;

            )`
            );

    export default db;
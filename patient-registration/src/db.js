import {PGlite} from 'pg-lite';

const db = new PGlite;

await db.exec('CREATE TABLE IF NOT EXISTS
    patients(

    )
    ');
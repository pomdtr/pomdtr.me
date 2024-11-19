import { DB } from "jsr:@pomdtr/sqlite";

// Open a database to be held in memory
const db = new DB(":memory:"); // or new DB()
// Use new DB("file.db"); for a file-based database
db.execute(`
  CREATE TABLE IF NOT EXISTS people (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
  )`);

const res: any[] = [];
// Insert data within a transaction
db.transaction(() => {
  for (const name of ["Peter Parker", "Clark Kent", "Bruce Wayne"]) {
    res.push(db.query("INSERT INTO people (name) VALUES (?)", [name]));
    console.log(db.lastInsertRowId);
  }

  res.push(db.queryEntries("select * from people"));
});

console.log(res);
// Todo: Other CRUD operations here...

// Close database to clean up resources
db.close();

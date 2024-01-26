const sqlite3 = require('sqlite3').verbose();

async function getDb() {
  const db = new sqlite3.Database('./db.sqlite');
  await new Promise((resolve, reject) => {
    db.run("CREATE TABLE User (firstName TEXT, lastName TEXT)", (err) => {
      if (err) {
        console.log(err);
        console.log('dont care if the table already exists, resolving')
        resolve();
      } else {
        resolve();
      }
    });
  });
  return db;
}

getDb().then((db) => {

});
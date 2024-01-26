import { ExpoRequest, ExpoResponse } from 'expo-router/server';
import sqlite3 from 'sqlite3';

async function getDb() {
  const db = new sqlite3.Database('./db.sqlite');
  await new Promise<void>((resolve, reject) => {
    db.run("CREATE TABLE User (firstName TEXT, lastName TEXT)", (err) => {
      if (err) {
        console.log('dont care if the table already exists, resolving')
        resolve();
      } else {
        resolve();
      }
    });
  });
  return db;
}

export async function GET(request: ExpoRequest) {
  const db = await getDb();
  const rows = await new Promise<any[]>((resolve, reject) => {
    db.all("SELECT firstName, lastName FROM User", (err, rows) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
  return ExpoResponse.json(rows);
}

export async function POST(request: ExpoRequest) {
  const body = await request.json();
  const db = await getDb();
  // it never gets this far - you can comment the below part out and get the same error
  // (I did this just to make sure I was comparing apples-to-apples with the control experiment)
  await new Promise<void>((resolve, reject) => {
    const sql = ("INSERT INTO User(firstName,lastName) VALUES (?)");
    db.run(sql, [ body.firstName, body.lastName ], function(err){
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve();
      }
    });
  });
  db.close();
  return ExpoResponse.json({ firstName: body.firstName, lastName: body.lastName });
}
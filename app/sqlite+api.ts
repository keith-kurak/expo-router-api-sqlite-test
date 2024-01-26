import { ExpoRequest, ExpoResponse } from 'expo-router/server';
import sqlite3 from 'sqlite3';

async function getDb() {
  const db = new sqlite3.Database('./db.sqlite', sqlite3.OPEN_CREATE);
  await new Promise<void>((resolve, reject) => {
    db.run("CREATE TABLE User (firstName TEXT, lastName TEXT)", (err) => {
      if (err) {
        console.log(err);
        reject(err);
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
import { ExpoRequest, ExpoResponse } from 'expo-router/server';
import { Sequelize, DataTypes } from 'sequelize';
//import SQLite from 'sqlite3';

// NOTE: pg-hstore is added to resolve this error:
// https://github.com/sequelize/sequelize/issues/7509
// it's not used anywhere

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite',
  /*dialectOptions: {
    mode: SQLite.OPEN_CREATE
  }*/
});

const User = sequelize.define('User', {
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
    // allowNull defaults to true
  }
}, {
});

export async function GET(request: ExpoRequest) {
  const users = User.findAll();
  return ExpoResponse.json(users);
}

export async function POST(request: ExpoRequest) {
  const body = await request.json();
  const user = await User.create({ firstName: body.firstName, lastName: body.lastName });
  return ExpoResponse.json({ firstName: user.firstName, lastName: user.lastName });
}
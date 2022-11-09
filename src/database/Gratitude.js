const DB = require("./db.json")
const saveToDatabase = require("./utils")

const getAllGratitudes = () => {
  return DB.gratitudes;
};

const createNewGratitude = (newGratitude) => {
  const isAlreadyAdded =
    DB.gratitudes.findIndex((gratitude) => gratitude.name === newGratitude.name) > -1;
  if (isAlreadyAdded) {
    return;
  }
  DB.gratitudes.push(newGratitude);
  saveToDatabase(DB);
  return newGratitude;
};

module.exports = { getAllGratitudes, createNewGratitude };

/*
const { Client } = require('pg')

const getAllGratitudes = async () => {
  const client = new Client({
    user: "postgres",
    password: "password",
    host: "",
    port: "5432",
    database: "gratitudedb"
  });
  try {
    await client.connect();
    console.log('Successfully connected');
    const { rows } = await client.query('select * from gratitudes');
    console.table(rows);
    return rows;
  } catch(e) {
    console.log(`Something went wrong ${e}`);
  } finally {
    await client.end();
    console.log("Client disconnected successfully");
  }
};

const createNewGratitude = async (entry) => {
  const client = new Client({
    user: "postgres",
    password: "password",
    host: "",
    port: "5432",
    database: "gratitudedb"
  });
  try {
    await client.connect();
    console.log('Successfully connected');
    console.log('********************', entry)
    await client.query("insert into gratitudes values ($1, $2, $3, $4, $5)", entry)
    console.log('Successfully saved to database');
  } catch(e) {
    console.log(`Something went wrong ${e}`);
  } finally {
    await client.end();
    console.log("Client disconnected successfully");
  }
}
*/

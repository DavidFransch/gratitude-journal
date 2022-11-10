const DB = require("./db.json")
const saveToDatabase = require("./utils")

const getAllGratitudes = () => {
  return DB.gratitudes;
};

const getOneGratitude = (gratitudeId) => {
  const gratitude = DB.gratitudes.find((gratitude) => gratitude.id === gratitudeId)
  if(!gratitude){
    return;
  }
  return gratitude;
}

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

const updateOneGratitude = (gratitudeId, changes) => {
  const indexForUpdate = DB.gratitudes.findIndex((gratitude) => gratitude.id === gratitudeId);
  if(indexForUpdate === -1) {
    return;
  }
  const updatedGratitude = {
    ...DB.gratitudes[indexForUpdate],
    ...changes,
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" })
  };
  DB.gratitudes[indexForUpdate] = updatedGratitude;
  saveToDatabase(updatedGratitude)
  return updatedGratitude;
}

const deleteOneGratitude = (gratitudeId) => {
  const indexForDeletion = DB.gratitudes.findIndex((gratitude) => gratitude.id === gratitudeId);
  if(indexForDeletion === -1) {
    return;
  }
  DB.gratitudes.splice(indexForDeletion, 1);
  saveToDatabase(DB);
}

module.exports = { getAllGratitudes, createNewGratitude, getOneGratitude, updateOneGratitude, deleteOneGratitude };

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

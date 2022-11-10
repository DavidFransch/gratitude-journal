const DB = require("./db.json")
const saveToDatabase = require("./utils")

const getAllGratitudes = () => {
  try {
    return DB.gratitudes;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const getOneGratitude = (gratitudeId) => {
  try {
    const gratitude = DB.gratitudes.find((gratitude) => gratitude.id === gratitudeId)
    if(!gratitude){
      throw {
        status: 500,
        message: `Can't find gratitude with the id '${gratitudeId}'`
      };
    }
    return gratitude;
  } catch (error) {
    throw({status: error?.status || 500, message: error?.message || error})
  }
}

const createNewGratitude = (newGratitude) => {
  const isAlreadyAdded =
    DB.gratitudes.findIndex((gratitude) => gratitude.name === newGratitude.name) > -1;
  if (isAlreadyAdded) {
    throw {
      status: 400,
      message: `Gratitude with the name '${newGratitude}' already exists`
    };
  }
  try {
    DB.gratitudes.push(newGratitude);
    saveToDatabase(DB);
    return newGratitude;
  } catch(error) {
    throw { status: 500, message: error?.message || error };
  }
};

const updateOneGratitude = (gratitudeId, changes) => {
  try {
    const isAlreadyAdded = DB.gratitudes.findIndex((gratitude) => gratitude.name === changes.name)
    if(isAlreadyAdded){
      throw {
        status: 400,
        message: `Gratitude with the name '${changes.name}' already exists`
      };
    }
    const indexForUpdate = DB.gratitudes.findIndex((gratitude) => gratitude.id === gratitudeId);
    if(indexForUpdate === -1) {
      throw {
        status: 400,
        message: `Can't find gratitude with the id '${gratitudeId}'`
      };
    }
    const updatedGratitude = {
      ...DB.gratitudes[indexForUpdate],
      ...changes,
      updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" })
    };
    DB.gratitudes[indexForUpdate] = updatedGratitude;
    saveToDatabase(updatedGratitude)
    return updatedGratitude;
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error
    }
  }
}

const deleteOneGratitude = (gratitudeId) => {
  try {
    const indexForDeletion = DB.gratitudes.findIndex((gratitude) => gratitude.id === gratitudeId);
    if(indexForDeletion === -1) {
      throw {
        status: 400,
        message: `Can't find gratitude with the id '${gratitudeId}'`
      }
    }
    DB.gratitudes.splice(indexForDeletion, 1);
    saveToDatabase(DB);
  } catch(error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error
    }
  }
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

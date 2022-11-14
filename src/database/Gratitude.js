const DB = require("./db.json")
const saveToDatabase = require("./utils")

// TODO: move to schema or model file
/**
 * @openapi
 * components:
 *   schemas:
 *     Gratitude:
 *       type: object
 *       properties:
 *         id: 
 *           type: string
 *           example: 61dbae02-c147-4e28-863c-db7bd402b2d6
 *         name: 
 *           type: string
 *           example: Tommy 
 *         description:
 *           type: string
 *           example: I am grateful for xyz  
 *         mode:
 *           type: string
 *           example: Premium
 *         createdAt:
 *           type: string
 *           example: 4/20/2022, 2:21:56 PM
 *         updatedAt: 
 *           type: string
 *           example: 4/20/2022, 2:21:56 PM
 *     SingleGratitude:
 *       type: object
 *       properties:
 *         id: 
 *           type: string
 *           example: 4a3d9aaa-608c-49a7-a004-66305ad4ab50
 *         name: 
 *           type: string
 *           example: Johnny 
 *         description:
 *           type: string
 *           example: I am grateful for xyz  
 *         mode:
 *           type: string
 *           example: Premium
 *         createdAt:
 *           type: string
 *           example: 4/20/2022, 2:21:56 PM
 *         updatedAt: 
 *           type: string
 *           example: 4/20/2022, 2:21:56 PM
 *     SingleRecord:
 *       type: object
 *       properties:
 *         id: 
 *           type: string
 *           example: 0bff586f-2017-4526-9e52-fe3ea46d55ab
 *         gratitude: 
 *           type: string
 *           example: d8be2362-7b68-4ea4-a1f6-03f8bc4eede7 
 *         record:
 *           type: string
 *           example: "100"  
 */

const getAllGratitudes = (filterParams) => {
  try {
    let gratitudes = DB.gratitudes;
    if(filterParams.mode) {
      return DB.gratitudes.filter((gratitude) => gratitude.mode.toLowerCase().includes(filterParams.mode));
    }
    return gratitudes;
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

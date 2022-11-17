const { v4: uuid } = require('uuid')
const GratitudeDatabase = require('../database/GratitudeDatabase')

const getAllGratitudes = async (filterParams) => {
  try {
    const { rows } = await GratitudeDatabase.getAllGratitudes();
    if(filterParams.mode) {
      return rows.filter((gratitude) => gratitude.mode.toLowerCase().includes(filterParams.mode));
    }
    return rows; 
  } catch(error) {
    throw { 
      status: error?.status || 500, 
      message: error?.message || error
    };
  }
};

const getOneGratitude = async (gratitudeId) => {
  try {
    const { rows } = await GratitudeDatabase.getOneGratitude(gratitudeId);
    return rows;
  } catch(error) {
    throw { 
      status: error?.status || 500, 
      message: error?.message || error
    };
  }
};

const createNewGratitude = async (newGratitude) => {
  const { rows } = await GratitudeDatabase.getAllGratitudes();
  const isAlreadyAdded = rows.findIndex((gratitude) => gratitude.name === newGratitude.name) > -1;
  if(isAlreadyAdded){
    throw {
      status: 400,
      message: `Gratitude with the name '${newGratitude.name}' already exists`
    }
  }
  const gratitudeToInsert = {
    ...newGratitude,
    id: uuid(),
    createdAt: new Date().toLocaleString("en-US", { timeZone: 'UTC' }),
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" })
  };
  try {
    await GratitudeDatabase.createNewGratitude(gratitudeToInsert);
    return gratitudeToInsert;
  } catch(error) {
    throw { 
      status: error?.status || 500, 
      message: error?.message || error
    };
  }
};

const updateGratitude = async (gratitudeId, changes) => {
  try {
    const { rows } = await GratitudeDatabase.getAllGratitudes();
    const isAlreadyAdded = rows.findIndex((gratitude) => gratitude.name === changes.name) > -1;
    if(isAlreadyAdded){
      throw {
        status: 400,
        message: `Gratitude with the name '${changes.name}' already exists`
      };
    }
    const indexForUpdate = rows.findIndex((gratitude) => gratitude.id === gratitudeId);
    if(indexForUpdate === -1) {
      throw {
        status: 400,
        message: `Can't find gratitude with the id '${gratitudeId}'`
      };
    }
    const updatedChanges = {
      ...changes,
      updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" })
    }
    await GratitudeDatabase.updateGratitude(gratitudeId, updatedChanges);
  } catch(error) {
    throw { 
      status: error?.status || 500, 
      message: error?.message || error
    };
  }
};

const deleteGratitude = async (gratitudeId) => {
  try {
    const { rows } = await GratitudeDatabase.getAllGratitudes();
    const indexForDeletion = rows.findIndex((gratitude) => gratitude.id === gratitudeId);
    if(indexForDeletion === -1){
      throw {
        status: 400,
        message: `Can't find gratitude with id '${gratitudeId}'`
      }
    }
    await GratitudeDatabase.deleteGratitude(gratitudeId);
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error 
    };
  }
};

module.exports = {
  getAllGratitudes,
  getOneGratitude,
  createNewGratitude,
  updateGratitude,
  deleteGratitude
}

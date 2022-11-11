const { v4: uuid } = require('uuid')
const Gratitude = require('../database/Gratitude')

const getAllGratitudes = (filterParams) => {
  try {
    const allGratitudes = Gratitude.getAllGratitudes(filterParams);
    return allGratitudes;
  } catch(error) {
    throw error;
  }
};

const getOneGratitude = (gratitudeId) => {
  try {
    const gratitude = Gratitude.getOneGratitude(gratitudeId);
    return gratitude;
  } catch(error) {
    throw error;
  }
};

const createNewGratitude = (newGratitude) => {
  const gratitudeToInsert = {
    ...newGratitude,
    id: uuid(),
    createdAt: new Date().toLocaleString("en-US", { timeZone: 'UTC' }),
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" })
  };
  try {
    const createdGratitude = Gratitude.createNewGratitude(gratitudeToInsert);
    return createdGratitude;
  } catch(error) {
    throw error;
  }
};

const updateOneGratitude = (gratitudeId, changes) => {
  try {
    const updatedGratitude = Gratitude.updateOneGratitude(gratitudeId, changes);
    return updatedGratitude;
  } catch(error) {
    throw error;
  }
};

const deleteOneGratitude = (gratitudeId) => {
  try {
    Gratitude.deleteOneGratitude(gratitudeId);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllGratitudes,
  getOneGratitude,
  createNewGratitude,
  updateOneGratitude,
  deleteOneGratitude
}

const { v4: uuid } = require('uuid')
const Gratitude = require('../database/Gratitude')
const getAllGratitudes = () => {
  const allGratitudes = Gratitude.getAllGratitudes();
  return allGratitudes;
};
const getOneGratitude = (gratitudeId) => {
  const gratitude = Gratitude.getOneGratitude(gratitudeId);
  return gratitude;
};
const createNewGratitude = (newGratitude) => {
  const gratitudeToInsert = {
    ...newGratitude,
    id: uuid(),
    createdAt: new Date().toLocaleString("en-US", { timeZone: 'UTC' }),
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" })
  };
  const createdGratitude = Gratitude.createNewGratitude(gratitudeToInsert);
  return createdGratitude;
};
const updateOneGratitude = (gratitudeId, changes) => {
  const updatedGratitude = Gratitude.updateOneGratitude(gratitudeId, changes);
  return updatedGratitude;
};
const deleteOneGratitude = (gratitudeId) => {
  Gratitude.deleteOneGratitude(gratitudeId);
};

module.exports = {
  getAllGratitudes,
  getOneGratitude,
  createNewGratitude,
  updateOneGratitude,
  deleteOneGratitude
}

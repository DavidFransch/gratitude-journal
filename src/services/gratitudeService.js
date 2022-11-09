const { v4: uuid } = require('uuid')
const Gratitude = require('../database/Gratitude')
const getAllGratitudes = () => {
  const allGratitudes = Gratitude.getAllGratitudes();
  return allGratitudes;
};
const getOneGratitude = () => {
  return;
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
const updateOneGratitude = () => {
  return;
};
const deleteOneGratitude = () => {
  return;
};

module.exports = {
  getAllGratitudes,
  getOneGratitude,
  createNewGratitude,
  updateOneGratitude,
  deleteOneGratitude
}

const Gratitude = require('../database/Gratitude')
const getAllGratitudes = async() => {
  const allGratitudes = await Gratitude.getAllGratitudes();
  return allGratitudes;
};
const getOneGratitude = () => {
  return;
};
const createNewGratitude = () => {
  return;
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
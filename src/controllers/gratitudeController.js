const gratitudeService = require('../services/gratitudeService');

const getAllGratitudes = async (req, res) => {
  const allGratitudes = await gratitudeService.getAllGratitudes();
  res.send({ status: 'OK', data: allGratitudes });
};
const getOneGratitude = (req, res) => {
  const gratitude = gratitudeService.getOneGratitude();
  res.send("Get one gratitude")
};
const createNewGratitude = (req, res) => {
  const createdGratitude = gratitudeService.createNewGratitude();
  res.send("Create new gratitude")
};
const updateOneGratitude = (req, res) => {
  const updatedGratitude = gratitudeService.updateOneGratitude();
  res.send("Update an existing gratitude")
};
const deleteOneGratitude = (req, res) => {
  gratitudeService.deleteOneGratitude();
  res.send("Delete an existing gratitude")
};

module.exports = {
  getAllGratitudes,
  getOneGratitude,
  createNewGratitude,
  updateOneGratitude,
  deleteOneGratitude
}
const gratitudeService = require('../services/gratitudeService');

const getAllGratitudes = (req, res) => {
  const allGratitudes = gratitudeService.getAllGratitudes();
  res.send({ status: 'OK', data: allGratitudes });
};
const getOneGratitude = (req, res) => {
  const gratitude = gratitudeService.getOneGratitude();
  res.send("Get one gratitude")
};
const createNewGratitude = (req, res) => {
  const { body } = req;
  if(!body.name || !body.description) {
    return;
  }

  const newGratitude = {
    name: body.name,
    description: body.description,
  }

  const createdGratitude = gratitudeService.createNewGratitude(newGratitude);
  res.status(201).send({ status: "OK", data: createdGratitude })
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
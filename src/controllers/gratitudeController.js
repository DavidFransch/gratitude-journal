const gratitudeService = require('../services/gratitudeService');

const getAllGratitudes = (req, res) => {
  const allGratitudes = gratitudeService.getAllGratitudes();
  res.send({ status: 'OK', data: allGratitudes });
};

const getOneGratitude = (req, res) => {
  const { 
    params: { gratitudeId }
   } = req;
  
   if(!gratitudeId){
    return;
   }
  const gratitude = gratitudeService.getOneGratitude(gratitudeId);
  res.sendStatus({status: "OK", data: gratitude})
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
  res.status(201).sendStatus({ status: "OK", data: createdGratitude })
};

const updateOneGratitude = (req, res) => {
  const {
    body,
    params: { gratitudeId }
  } = req;
  const updatedGratitude = gratitudeService.updateOneGratitude(gratitudeId, body);
  res.sendStatus({status: "OK", data: updatedGratitude})
};

const deleteOneGratitude = (req, res) => {
  const {
    params: { gratitudeId }
  } = req;
  if(!gratitudeId){
    return;
  }
  gratitudeService.deleteOneGratitude(gratitudeId);
  res.send(204).sendStatus({status: "OK"})
};

module.exports = {
  getAllGratitudes,
  getOneGratitude,
  createNewGratitude,
  updateOneGratitude,
  deleteOneGratitude
}
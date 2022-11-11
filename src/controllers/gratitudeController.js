const gratitudeService = require('../services/gratitudeService');

const getAllGratitudes = (req, res) => {
  try {
    const { mode } = req.query;
    const allGratitudes = gratitudeService.getAllGratitudes({ mode });
    res.send({ status: 'OK', data: allGratitudes });
  } catch(error) {
    res
      .status(error?.status || 500)
      .send({status: "FAILED", data: {error: error?.message || error}} )
  }
};

const getOneGratitude = (req, res) => {
  const { 
    params: { gratitudeId }
   } = req;
   if(!gratitudeId){
    res
      .status(400)
      .send({
        status: "FAILED",
        data: {error: "Parameter 'gratitudeId' can not be empty"}
      })
    return;
   }
  try {
    const gratitude = gratitudeService.getOneGratitude(gratitudeId);
    res.send({status: "OK", data: gratitude})
  } catch(error) {
    res
      .status(error?.status || 500)
      .send({
        status: "FAILED",
        data: {error: error?.message || error}
      })
  }
};

const createNewGratitude = (req, res) => {
  const { body } = req;
  if(!body.name || !body.description) {
    res 
      .status(400)
      .send({
        status: "FAILED",
        data: {
          error: "One of the following keys is missing or is empty in request body: 'name' or 'description"
        }
      })
    return;
  }

  const newGratitude = {
    name: body.name,
    description: body.description,
  }

  try {
    const createdGratitude = gratitudeService.createNewGratitude(newGratitude);
    res.status(201).send({ status: "OK", data: createdGratitude })
  } catch(error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } })
  }
};

const updateOneGratitude = (req, res) => {
  const {
    body,
    params: { gratitudeId }
  } = req;
  if(!gratitudeId) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: {
          error: "Parameter 'gratitudeId' can not be empty"
        }
      })
    return;
  }
  try {
    const updatedGratitude = gratitudeService.updateOneGratitude(gratitudeId, body);
    res.send({status: "OK", data: updatedGratitude})
  } catch(error) {
    res
      .status(error?.status || 500)
      .send({status: "FAILED", data: { error: error?.message || error }})
  }
};

const deleteOneGratitude = (req, res) => {
  const {
    params: { gratitudeId }
  } = req;
  if(!gratitudeId){
    res 
      .status(400)
      .send({
        status: "FAILED",
        data: {error: "Parameter 'gratitudeId' can not be empty"}
      });
    return;
  }
  try {
    gratitudeService.deleteOneGratitude(gratitudeId);
    res.send(204).send({status: "OK"});
  } catch(error) {
    res
      .status(error?.status || 500)
      .send({
        status: "FAILED",
        data: {error: error?.message || error}
      })
  }
};

module.exports = {
  getAllGratitudes,
  getOneGratitude,
  createNewGratitude,
  updateOneGratitude,
  deleteOneGratitude
}
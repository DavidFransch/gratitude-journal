const gratitudeService = require('../services/gratitudeService');

const getAllGratitudes = async (req, res) => {
  try {
    const { mode } = req.query;
    const allGratitudes = await gratitudeService.getAllGratitudes({ mode });
    res.send({ status: 'OK', data: allGratitudes });
  } catch(error) {
    res
      .status(error?.status || 500)
      .send({status: "FAILED", data: {error: error?.message || error}} )
  }
};

const getOneGratitude = async (req, res) => {
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
    const gratitude = await gratitudeService.getOneGratitude(gratitudeId);
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

const createNewGratitude = async (req, res) => {
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
    const createdGratitude = await gratitudeService.createNewGratitude(newGratitude);
    res.status(201).send({ status: "OK", data: createdGratitude });
  } catch(error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } })
  }
};

const updateGratitude = async (req, res) => {
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
    await gratitudeService.updateGratitude(gratitudeId, body);
    res.send({status: "OK", data: updatedGratitude})
  } catch(error) {
    res
      .status(error?.status || 500)
      .send({status: "FAILED", data: { error: error?.message || error }})
  }
};

const deleteGratitude = async (req, res) => {
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
    await gratitudeService.deleteGratitude(gratitudeId);
    res.send({status: "OK"});
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
  updateGratitude,
  deleteGratitude
}
const getAllGratitudes = (req, res) => {
  res.send("Get all gratitudes")
};
const getOneGratitude = (req, res) => {
  res.send("Get one gratitude")
};
const createNewGratitude = (req, res) => {
  res.send("Create new gratitude")
};
const updateOneGratitude = (req, res) => {
  res.send("Update an existing gratitude")
};
const deleteOneGratitude = (req, res) => {
  res.send("Delete an existing gratitude")
};

module.exports = {
  getAllGratitudes,
  getOneGratitude,
  createNewGratitude,
  updateOneGratitude,
  deleteOneGratitude
}
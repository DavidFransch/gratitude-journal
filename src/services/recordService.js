const Records = require("../database/Record")

// const getAllRecords = () => {
//   try {
//     const allRecords = Records.getAllRecords();
//     return allRecords;
//   } catch(error){
//     throw error;
//   }
// }

const getRecordForGratitude = (gratitudeId) => {
  try {
    const record = Records.getRecordForGratitude(gratitudeId);
    return record;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  // getAllRecords,
  getRecordForGratitude
}
const DB = require("./db.json")
const saveToDatabase = require("./utils.js")

// const getAllRecords = () => {
//   try {
//     const allRecords = DB.records;
//     return allRecords;
//   } catch(error) {
//     throw {
//       status: 500,
//       message: error
//     };
//   }
// }

const getRecordForGratitude = (gratitudeId) => {
  try {
    // console.log(DB.records)
    // console.log(gratitudeId)
    // DB.records.map((id) => console.log(id.gratitude))
    const record = DB.records.filter((record) => record.gratitude === gratitudeId);
    // console.log(record)
    if(!record){
      throw {
        status: 400,
        message: `Can't find workout with the id '${workoutId}'`
      };
    }
    return record;
  } catch (error) {
    throw {
      status: error?.status || 500,
      message: error?.message || error
    };
  }
}

module.exports = {
  // getAllRecords,
  getRecordForGratitude
}
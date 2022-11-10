const recordService = require("../services/recordService")
// const getAllRecords = (req, res) => {
//   try {
//     const allRecords = recordService.getAllRecords();
//     return allRecords;
//   } catch(error) {
//     res 
//       .status(error?.status || 500)
//       .send({
//         status: "FAILED",
//         data: {error: error?.message || error}
//       })
//   }
// }

const getRecordForGratitude = (req, res) => {
  const { params: {gratitudeId} } = req;
    if(!gratitudeId){
      res
        .status(400)
        .send({
          status: "FAILED",
          send: {data: `Parameter gratitudeId can't be empty`}
        })
        return;
    }
  try {
    const record = recordService.getRecordForGratitude(gratitudeId);
    res
      .send({status: "OK", data: record})
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({
        data: error?.message || error
      })
  }
}

module.exports = {
  // getAllRecords,
  getRecordForGratitude
}
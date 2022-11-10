const express = require("express");
const router = express.Router();
const gratitudeController = require("../controllers/gratitudeController");
const recordController = require("../controllers/recordController");

router.get('/', gratitudeController.getAllGratitudes);

router.get('/:gratitudeId', gratitudeController.getOneGratitude);

router.get('/:gratitudeId/records', recordController.getRecordForGratitude);

router.post('/', gratitudeController.createNewGratitude);

router.patch('/:gratitudeId', gratitudeController.updateOneGratitude);

router.delete('/:gratitudeId', gratitudeController.deleteOneGratitude);

module.exports = router;
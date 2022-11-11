const express = require("express");
const apicache = require("apicache");

const gratitudeController = require("../controllers/gratitudeController");
const recordController = require("../controllers/recordController");

const router = express.Router();
const cache = apicache.middleware;

router.get('/', cache("2 minutes"), gratitudeController.getAllGratitudes);

router.get('/:gratitudeId', gratitudeController.getOneGratitude);

router.get('/:gratitudeId/records', recordController.getRecordForGratitude);

router.post('/', gratitudeController.createNewGratitude);

router.patch('/:gratitudeId', gratitudeController.updateOneGratitude);

router.delete('/:gratitudeId', gratitudeController.deleteOneGratitude);

module.exports = router;
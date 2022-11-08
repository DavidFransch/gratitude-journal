const express = require("express");
const { reset } = require("nodemon");
const router = express.Router();
const gratitudeController = require("../controllers/gratitudeController")

router.get('/', gratitudeController.getAllGratitudes)

router.get('/:gratitudeId', gratitudeController.getOneGratitude)

router.post('/', gratitudeController.createNewGratitude)

router.patch('/:gratitudeId', gratitudeController.updateOneGratitude)

router.delete('/:gratitudeId', gratitudeController.deleteOneGratitude)

module.exports = router;
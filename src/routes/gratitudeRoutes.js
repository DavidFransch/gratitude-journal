const express = require("express");
const { reset } = require("nodemon");
const router = express.Router();

router.get('/', (req, res) => {
  res.send(`Get all gratitudes`)
})

router.get('/:gratitudeId', (req, res) => {
  res.send('Get an existing gratitude entry')
})

router.post('/', (req,res) => {
  res.send('Create a new gratitude entry')
})

router.patch('/:gratitudeId' , (req, res) => {
  res.send('Update an existing gratitude entry')
})

router.delete('/:gratitudeId', (req, res) => {
  res.send('Delete a gratitude entry')
})

module.exports = router;
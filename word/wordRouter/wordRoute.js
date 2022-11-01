const express = require('express');
const { deleteModel } = require('mongoose');
const { createWord, updateWord, getWord, deleteWord } = require('../wordControler/wordControler');
const router = express.Router();

router.post('/create-word', createWord);
router.post('/update-word', updateWord);
router.get('/get-word', getWord);
router.delete('/delete-word', deleteWord);

module.exports = router;
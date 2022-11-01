const express = require('express');
const { getAllUser, deleteUser, adminLogin } = require('../adminControler/adminControler');
const router = express.Router();

router.post('/login-admin', adminLogin);

router.get('/getAll-user', getAllUser);

router.delete('/delete-user', deleteUser);

module.exports = router;
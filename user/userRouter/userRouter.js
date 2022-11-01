const express = require('express');
const { checkLogin } = require('../../middleWare/auth');
const { register, LoginUser, UpdateInfoUser } = require('../userControler/userControler');
const router = express.Router();

router.post('/register', register);

router.post('/login', LoginUser);

router.use(checkLogin);

router.post('/update-info-user', UpdateInfoUser);

module.exports = router;
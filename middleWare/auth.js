const jwt = require('jsonwebtoken');
const {PASSWORD_ADMIN} = process.env;

exports.checkLogin = async (req, res, next) => {
    const userCookies = req.cookies['userToken'];
    try {
        if (!userCookies) return res.redirect('/login');

        let userInfo = jwt.verify(userCookies, PASSWORD_ADMIN);

        if (!userInfo) return res.redirect('/login');

        req.use = data.checkUser;
        next();
    } catch (error) {
        res.redirect('/login');
    }
};
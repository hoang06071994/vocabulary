const { UserModel } = require("../userModel/userModel");
const bcrypt = require('bcrypt');
const {PASSWORD_ADMIN} = process.env;
const jwt = require('jsonwebtoken');


exports.register = async (req, res) => {
    try {
        const user = await UserModel.findOne({email: req.body.email});
        if (user) return res.status(400).json({mess: 'email đã tồn tại'});
        const password = await bcrypt.hash( req.body.password, 10);
        const newUser =  await UserModel.create({
            email: req.body.email,
            password: password,
            age: req.body.age,
            avatar: req.body.avatar
        });
        res.status(200).json({mess: ' Đăng ký thành công', newUser});
    } catch (error) {
        res.status(500).json({mess: 'server error', error});
    }
};

exports.LoginUser = async (req, res) => {
    try {
        const checkUser = await UserModel.findOne({email: req.body.email});
        if (!checkUser) return res.status(400).json({mess: 'email này chưa được đăng ký'});

        const checkPassword = await bcrypt.compare(req.body.password, checkUser.password);
        if (checkPassword === false) return res.status(400).json({mess: 'mật khẩu không đúng'});

        delete checkUser._doc.password;

        const userToken = jwt.sign({checkUser}, PASSWORD_ADMIN, {expiresIn: '10h'});

        res.cookie('userToken', userToken, {expiresIn: new Date(Date.now() + 900000), httpOnly: true});
        res.status(200).json({mess: 'seccess', checkUser, userToken});
    } catch (error) {
        res.status(500).json({mess: 'server error', error});
    }
};

exports.UpdateInfoUser = async (req, res) => {
    try {
        const checkUser = await  UserModel.findOne({email: req.body.email});
        console.log(checkUser)
        if (!checkUser) return res.status(400).json({mess: 'check email'});

        const checkPassword = await bcrypt.compare(req.body.password, checkUser.password);
        if (checkPassword === false) return res.status(400).json({mess: 'check password'});

        const newPasword = await bcrypt.hash(req.body.newPassword, 10);
        
        const newUser = await UserModel.updateOne({email: req.body.email}, {
            email: req.body.newEmail,
            password: newPasword,
            age: req.body.newAge,
            avatar: req.body.newAvatar
        });
        res.status(200).json({mess: 'secess', newUser});
    } catch (error) {
        res.status(500).json({mess: 'server error', error});
    }
};
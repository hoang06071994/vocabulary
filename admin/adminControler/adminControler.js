const { UserModel } = require("../../user/userModel/userModel");
const bcrypt = require('bcrypt');

exports.adminLogin = async (req, res) => {
    try {
        const admin = await UserModel.findOne({email: req.body.email});
        if (!admin) return res.status(400).json({mess: 'check email'});

        const password = await bcrypt.compare(req.body.password, admin.password);
        if (!password) return res.status(400).json({mess: 'check password'});

        if (admin.role == 'admin') {
            res.status(200).json({mess: 'secess', admin});
        } else {
            res.status(400).json({mess: 'khong phai admin'});
        }
    } catch (error) {
        res.status(500).json({mess: 'server error'});
    }
};

exports.getAllUser = async (req, res) => {
    try {
        const allUser = await UserModel.find();
        res.status(200).json({mess: 'seccess', allUser});
    } catch (error) {
        res.status(500).json({mess: 'server error'});
    }
};

exports.deleteUser = async (req, res)  => {
    try {
       const user =  await UserModel.deleteOne({id: req.params._id});
        if (user.deletedCount == 0) return res.status(400).json({mess: 'check _id'});
        if (user.deletedCount == 1) return res.status(200).json({mess: 'delete ok'});
    } catch (error) {
        res.status(500).json({mess: 'server error'});
    }
};


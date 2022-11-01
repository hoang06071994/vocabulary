const { UserModel } = require("../../user/userModel/userModel");
const { wordModel } = require("../wordModel/wordModel");


exports.createWord = async (req, res) => {
    const word = req.body.word;
    const spelling = req.body.spel;
    const audio =  req.body.audio;
    const means =  req.body.means;
    const example = req.body.examp;
    const userId = req.body.userId;
    try {
        const newWord = await wordModel.findOne({word: req.body.word});
        if (newWord) {
            const updateWord =  await wordModel.updateOne({word: req.body.word}, {
                spelling: spelling,
                audio: audio,
                means: means,
                example: example,
            });
            res.status(200).json({mess: 'word already', updateWord});
        } else {
            const createWord = await wordModel.create({
                userId: userId,
                word: word,
                spelling: spelling,
                audio: audio,
                means: means,
                example: example
            });
            res.status(200).json({ mess: 'secess', createWord});
        }
    } catch (error) {
        res.status(500).json({mess: 'server error'});
    }
};

exports.updateWord = async (req, res) => {
    try {
        const checkWord = await wordModel.findOne({word: req.body.word});
        if (!checkWord) return res.status(400).json({mess: 'check word'});
        
        const updateWord = await wordModel.updateOne({word: req.body.word}, {
            spelling : req.body.spelling,
            audio : req.body.audio,
            means : req.body.means,
            example : req.body.example,
        });
        res.status(200).json({mess: 'secess', updateWord});
    } catch (error) {
        res.status(500).json({mess: 'server error'});
    }
};

exports.getWord = async (req, res) => {
    let {page, pageSize} = req.query;
    page = page ? page : 1;
    pageSize = pageSize ? pageSize : 10;
    try {
        const checkUser = await wordModel.findOne({userId: req.body.userId});
        if (!checkUser) return res.status(400).json({mess: 'not logged'});

        const total = await wordModel.count();
        const totalPage = Math.ceil(total / pageSize);
        const listWord = await wordModel.find().skip((page - 1) * pageSize).limit(pageSize * 1);

        const user = await wordModel.findOne({userId: req.body.userId}).populate('userId');
        
        res.status(200).json({mess: 'secess', total, totalPage, listWord, user});
    } catch (error) {
        res.status(500).json({mess: 'server error'});
    }
};

exports.deleteWord = async (req, res) => {
    try {
        const word = await wordModel.deleteOne({word: req.body.word});
        if (word.deletedCount === 0) return res.status(400).json({mess: 'check word'});
        if ( word.deletedCount === 1) return res.status(200).json({mess: 'secess'});
    } catch (error) {
        res.status(500).json({mess: 'server error'});
    }
};
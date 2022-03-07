const userModel = require('../models/user.model');

module.exports.update = (req, res) => {

    const { name, email, companyName, address, bankAccount, telefon,uid } = req.body;
    userModel.findOneAndUpdate({ username: req.user.username }, { name, email, companyName, address, bankAccount, telefon ,uid}, (err, user) => {
        
        if (err){
            console.log(err);
            res.status(500).json(err);}
        else {
            console.log(user,req.user.username);
            res.json({
                message: 'User updated successfully',
            });
        }
    });
}

module.exports.getUser = (req, res) => {
    userModel.findOne({ username: req.params.username }, (err, user) => {
        if (err) res.status(500).json(err);
        else res.json(user);
    });
}
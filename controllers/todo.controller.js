const todoModel = require('../models/todo.model');

module.exports.update = async (req, res) => {
    try {
        let todo = await todoModel.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json(todo);
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports.create = async (req, res) => {
    try {
        let todo = await todoModel.create({...req.body, userId: req.user._id});
        //save();
        res.status(200).json(todo);
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports.remove = async (req, res) => {
    try{
        let todo = await todoModel.findByIdAndDelete(req.params.id);
        res.status(200).json(todo);
    }catch(err){
        res.status(500).json(err);
    }
}

module.exports.getAll = async (req, res) => {
    try{
        let todos = await todoModel.find({ userId: req.user._id });
        res.status(200).json(todos);
    }catch(err){
        res.status(500).json(err);
    }
}

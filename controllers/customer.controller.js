const customerModel = require('../models/customer.model');

const getAll = async (req, res) => {
    try {
        const customers = await customerModel.find({ userId: req.user._id });
        res.status(200).json(customers);
    } catch (err) {
        res.status(500).json(err);
    }
}

const getById = async (req, res) => {
    try {
        const customer = await customerModel.findById(req.params.id);
        res.status(200).json(customer);
    } catch (err) {
        res.status(500).json(err);
    }
}

const create = async (req, res) => {
    try {
        const customer = await customerModel.create({...req.body,userId:req.user._id});
        await customer.save();
        res.status(200).json(customer);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

const update = async (req, res) => {
    try {
        const customer = await customerModel.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json(customer);
    } catch (err) {
        res.status(500).json(err);
    }
}
const remove = async (req, res) => {
    try {
        const customer = await customerModel.findByIdAndRemove(req.params.id);
        res.status(200).json(customer);
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
}
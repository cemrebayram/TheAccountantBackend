const productModel = require('../models/product.model');

const getAll = async (req, res) => {
    try {
        const products = await productModel.find({ userId: req.user._id });
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
    }
}

const getById = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
}

const create = async (req, res) => {
    console.log("USER",req.user)
    try {
        const product = await productModel.create({...req.body,userId:req.user._id});
        await product.save();
        console.log("ADDED",product);
        res.status(200).json(product);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

const update = async (req, res) => {
    try {
        const product = await productModel.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
}
const remove = async (req, res) => {
    try {
        const product = await productModel.findByIdAndRemove(req.params.id);
        res.status(200).json(product);
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
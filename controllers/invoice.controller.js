const generatePDF = require('../helpers/generateInvoicePDF');
const invoiceModel = require('../models/invoice.model');
const fs = require('fs/promises');
const getAll = async (req, res) => {
    try {
        const invoices = await invoiceModel.find({ userId: req.user._id }).populate('products').populate('customer').populate('userId');
        res.status(200).json(invoices);
    } catch (err) {
        res.status(500).json(err);
    }
}

const pdf = async (req, res) => {
    try {
        const invoice = await invoiceModel.findById(req.params.id).populate('products').populate('customer').populate('userId');
        await generatePDF(invoice);
        let pdfData = await fs.readFile(`public/${invoice._id}.pdf`);
        res.status(200).download(`public/${invoice._id}.pdf`)
        res.on('finish', () => {
            fs.unlink(`public/${invoice._id}.pdf`);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

const getById = async (req, res) => {
    try {
        const invoice = await invoiceModel.findById(req.params.id).populate('products').populate('customer').populate('userId');
        res.status(200).json(invoice);
    } catch (err) {
        res.status(500).json(err);
    }
}

const create = async (req, res) => {
    try {
        const invoice = await invoiceModel.create({ ...req.body, userId: req.user._id });
        await invoice.save();
        res.status(200).json(invoice);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

module.exports = {
    getAll,
    getById,
    create,
    pdf
}
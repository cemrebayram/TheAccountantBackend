const generatePDF = require("../helpers/generateOfferPDF");
const offerModel = require("../models/offer.model");
const ProductModel = require("../models/product.model");
const fs = require("fs/promises");
const getAll = async (req, res) => {
  try {
    const offers = await offerModel
      .find({ userId: req.user._id })
      .populate("products.product")
      .populate("customer")
      .populate("userId");
    res.status(200).json(offers);
  } catch (err) {
    res.status(500).json(err);
  }
};

const pdf = async (req, res) => {
  try {
    const offer = await offerModel
      .findById(req.params.id)
      .populate("products.product")
      .populate("customer")
      .populate("userId");

   

    await generatePDF(offer);
    let pdfData = await fs.readFile(`public/${offer._id}.pdf`);
    res.status(200).download(`public/${offer._id}.pdf`);
    res.on("finish", () => {
      fs.unlink(`public/${offer._id}.pdf`);
    });
  } catch (err) {
    console.log("HATAAAAA",err);
    res.status(500).json(err);
  }
};

const getById = async (req, res) => {
  try {
    const offer = await offerModel
      .findById(req.params.id)
      .populate("products.product")
      .populate("customer")
      .populate("userId");
    res.status(200).json(offer);
  } catch (err) {
    res.status(500).json(err);
  }
};

const create = async (req, res) => {
  try {
    const offer = await offerModel.create({
      ...req.body,
      userId: req.user._id,
    });
    await offer.save();
    res.status(200).json(offer);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  pdf,
};

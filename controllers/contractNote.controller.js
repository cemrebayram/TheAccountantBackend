const generatePDF = require("../helpers/generateContractNotePDF");
const contractNoteModel = require("../models/contractNote.model");
const fs = require("fs/promises");
const getAll = async (req, res) => {
  try {
    const contractNotes = await contractNoteModel
      .find({ userId: req.user._id })
      .populate("products.product")
      .populate("customer")
      .populate("userId");
    res.status(200).json(contractNotes);
  } catch (err) {
    res.status(500).json(err);
  }
};

const pdf = async (req, res) => {
  try {
    const contractNote = await contractNoteModel
      .findById(req.params.id)
      .populate("products.product")
      .populate("customer")
      .populate("userId");

    await generatePDF(contractNote);
    let pdfData = await fs.readFile(`public/${contractNote._id}.pdf`);

    res.status(200).download(`public/${contractNote._id}.pdf`);
    res.on("finish", () => {
      fs.unlink(`public/${contractNote._id}.pdf`);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const getById = async (req, res) => {
  try {
    const contractNote = await contractNoteModel
      .findById(req.params.id)
      .populate("products.product")
      .populate("customer")
      .populate("userId");
    res.status(200).json(contractNote);
  } catch (err) {
    res.status(500).json(err);
  }
};

const create = async (req, res) => {
  console.log("USER", req.user);
  try {
    const contractNote = await contractNoteModel.create({
      ...req.body,
      userId: req.user._id,
    });
    await contractNote.save();
    console.log("ADDED", contractNote);
    res.status(200).json(contractNote);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  pdf,
};

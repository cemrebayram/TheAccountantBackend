const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");
var moment = require("moment");
const htmlToPdf = require("html-pdf");
const productModel = require("../models/product.model");

module.exports = async function generatePDF(offer) {
  console.log("BAŞLADI");
  let mockData = {
    customer: {
      name: offer.customer.name,
      address: offer.customer.address,
      uid: offer.customer.uid,
      companyName: offer.customer.companyName,
      telefon: offer.customer.telefon,
      email: offer.customer.email,
    },
    products: offer.products.map((p) => {
      //each p._id is a product
      return {
        product: {
          title: p.product.title,
          unit_price: p.product.price,
          unit: p.product.unit,
        },
        quantity: p.quantity,
        price: p.quantity * p.product.price
      };
    }),
    user: {
      name: offer.userId.name,
      email: offer.userId.email,
      telefon: offer.userId.telefon,
      address: offer.userId.address,
      companyName: offer.userId.companyName,
      uid: offer.userId.uid,
      bankAccount: offer.userId.bankAccount,
    },
    date: { createdAt: moment(offer.createdAt).format("DD.MM.YYYY") },
  };
  const today = new Date();
  var templateHtml = fs.readFileSync(
    path.join(process.cwd(), "helpers/offerTemplate.html"),
    "utf8"
  );
  var template = handlebars.compile(templateHtml);
  var finalHtml = template(mockData);
  var options = {
    format: "A4",
    directory: `public/${offer._id}.pdf`,
  };

  await new Promise((resolve, reject) => {
    htmlToPdf
      .create(finalHtml, options)
      .toFile(options.directory, function (err, res) {
        if (err) {
          reject();
        } else {
          resolve();
        }
      });
  });
  return true;
};

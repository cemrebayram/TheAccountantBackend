const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");
var moment = require("moment");
const htmlToPdf = require("html-pdf");

module.exports = async function generatePDF(offer) {
  let mockData = {
    customer: {
      name: offer.customer.name,
      address: offer.customer.address,
      uid: offer.customer.uid,
      companyName: offer.customer.companyName,
      telefon: offer.customer.telefon,
      email: offer.customer.email,
    },
    products: offer.products.map((p) => ({
      title: p.title,
      price: p.price,
      unit: p.unit,
    })),
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
          console.log("HATA", err);
          reject();
        } else {
          console.log("PDF created",res);
          resolve();
        }
      });
  });
  return true;
};

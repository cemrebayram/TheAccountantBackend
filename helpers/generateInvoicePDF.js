const fs = require("fs");
const path = require("path");
const htmlToPdf = require("html-pdf");
const handlebars = require("handlebars");
var moment = require("moment");

module.exports = async function generatePDF(invoice) {
  let mockData = {
    customer: {
      name: invoice.customer.name,
      address: invoice.customer.address,
      uid: invoice.customer.uid,
      companyName: invoice.customer.companyName,
      telefon: invoice.customer.telefon,
      email: invoice.customer.email,
    },
    products: invoice.products.map((p) => {
      return {
        product: {
          title: p.product.title,
          unit_price: p.product.price,
          unit: p.product.unit,
        },
        quantity: p.quantity,
        price: p.quantity * p.product.price,
      };
    }),
    user: {
      name: invoice.userId.name,
      email: invoice.userId.email,
      telefon: invoice.userId.telefon,
      address: invoice.userId.address,
      companyName: invoice.userId.companyName,
      uid: invoice.userId.uid,
      bankAccount: invoice.userId.bankAccount,
    },
    total:null,
    date: { createdAt: moment(invoice.createdAt).format("DD.MM.YYYY") },
  };
  mockData.total = mockData.products.reduce(function(a, b) { return a + b.price; }, 0);
  const today = new Date();
  var templateHtml = fs.readFileSync(
    path.join(process.cwd(), "helpers/invoiceTemplate.html"),
    "utf8"
  );
  // var template = handlebars.compile(templateHtml);
  // var finalHtml = encodeURIComponent(template(mockData));
  // var options = {
  //     format: 'A4',
  //     headerTemplate: "<p></p>",
  //     footerTemplate: "<p></p>",
  //     displayHeaderFooter: false,
  //     margin: {
  //         top: "40px",
  //         bottom: "100px"
  //     },
  //     printBackground: true,
  //     path: `public/${invoice._id}.pdf`
  // }
  // const browser = await puppeteer.launch({
  //     args: ['--no-sandbox'],
  //     headless: true
  // });
  // const page = await browser.newPage();
  // await page.goto(`data:text/html,${finalHtml}`, {
  //     waitUntil: 'networkidle0'
  // });
  // let data = await page.pdf(options);
  // //fs.writeFileSync("data.pdf",data);
  // await browser.close();
  // return data;
  var template = handlebars.compile(templateHtml);
  var finalHtml = template(mockData);
  var options = {
    format: "A4",
    directory: `public/${invoice._id}.pdf`,
  };

  await new Promise((resolve, reject) => {
    htmlToPdf
      .create(finalHtml, options)
      .toFile(options.directory, function (err, res) {
        if (err) {
          console.log("HATA", err);
          reject();
        } else {
          console.log("PDF created", res);
          resolve();
        }
      });
  });
  return true;
};

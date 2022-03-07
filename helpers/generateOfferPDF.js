
const fs = require("fs");
const path = require("path");
const puppeteer = require('puppeteer');
const handlebars = require("handlebars");
var moment = require("moment");

module.exports = async function generatePDF(offer) {
    let mockData = {
        customer: {
            name: offer.customer.name,
            address: offer.customer.address,
            uid: offer.customer.uid,
            companyName: offer.customer.companyName,
            telefon: offer.customer.telefon,
            email: offer.customer.email
        },
        products: offer.products.map((p)=>({
            title: p.title,
            price: p.price,
            unit: p.unit,
        })),
        user:{
            name: offer.userId.name,
            email: offer.userId.email,
            telefon: offer.userId.telefon,
            address: offer.userId.address,
            companyName: offer.userId.companyName,
            uid: offer.userId.uid,
            bankAccount: offer.userId.bankAccount,
        },

        date: {createdAt: moment(offer.createdAt).format("DD.MM.YYYY")}
    }
    const today = new Date();
    var templateHtml = fs.readFileSync(path.join(process.cwd(), 'helpers/offerTemplate.html'), 'utf8');
    var template = handlebars.compile(templateHtml);
    var finalHtml = encodeURIComponent(template(mockData));
    var options = {
        format: 'A4',
        headerTemplate: "<p></p>",
        footerTemplate: "<p></p>",
        displayHeaderFooter: false,
        margin: {
            top: "40px",
            bottom: "100px"
        },
        printBackground: true,
        path: `public/${offer._id}.pdf`
    }
    const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        headless: true
    });
    const page = await browser.newPage();
    await page.goto(`data:text/html,${finalHtml}`, {
        waitUntil: 'networkidle0'
    });
    let data = await page.pdf(options);
    //fs.writeFileSync("data.pdf",data);
    await browser.close();
    return data;

}
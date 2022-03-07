
const fs = require("fs");
const path = require("path");
const puppeteer = require('puppeteer');
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
            email: invoice.customer.email
        },
        products: invoice.products.map((p)=>({
            title: p.title,
            price: p.price,
            unit: p.unit,
        })),
        user:{
            name: invoice.userId.name,
            email: invoice.userId.email,
            telefon: invoice.userId.telefon,
            address: invoice.userId.address,
            companyName: invoice.userId.companyName,
            uid: invoice.userId.uid,
            bankAccount: invoice.userId.bankAccount,
        },
        total: invoice.products.reduce(function(a, b) { return a + b.price; }, 0),
        date: {createdAt: moment(invoice.createdAt).format("DD.MM.YYYY")}
    }
    const today = new Date();
    var templateHtml = fs.readFileSync(path.join(process.cwd(), 'helpers/invoiceTemplate.html'), 'utf8');
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
        path: `public/${invoice._id}.pdf`
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
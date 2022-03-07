
const fs = require("fs");
const path = require("path");
const puppeteer = require('puppeteer');
const handlebars = require("handlebars");
var moment = require("moment")

module.exports = async function generatePDF(contractNote) {
    let mockData = {
        customer: {
            name: contractNote.customer.name,
            address: contractNote.customer.address,
            uid: contractNote.customer.uid,
            companyName: contractNote.customer.companyName,
            telefon: contractNote.customer.telefon,
            email: contractNote.customer.email
        },
        products: contractNote.products.map((p)=>({
            title: p.title,
            price: p.price,
            unit: p.unit,
        })),
        user:{
            name: contractNote.userId.name,
            email: contractNote.userId.email,
            telefon: contractNote.userId.telefon,
            address: contractNote.userId.address,
            companyName: contractNote.userId.companyName,
            uid: contractNote.userId.uid,
            bankAccount: contractNote.userId.bankAccount,
        },
        total: contractNote.products.reduce(function(a, b) { return a + b.price; }, 0),
        date: {createdAt: moment(contractNote.createdAt).format("DD.MM.YYYY")}
    }
    const today = new Date();
    var templateHtml = fs.readFileSync(path.join(process.cwd(), 'helpers/contractNoteTemplate.html'), 'utf8');
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
        path: `public/${contractNote._id}.pdf`
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
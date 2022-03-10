const express = require("express"); //express web server framework
const pdf = require("html-pdf"); //generate pdf from html
const cors = require("cors"); //cors error block
const mongoose = require("mongoose"); //mongoose for database connection

//represents application
const app = express(); //create express server
require("dotenv").config(); //configure dotenv
const port = process.env.PORT || 80; //port for server
//routes
const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const customerRoute = require("./routes/customer.route");
const todoRoute = require("./routes/todo.route");
const productRoute = require("./routes/product.route");
const offerRoute = require("./routes/offer.route");
const contractNoteRoute = require("./routes/contractNote.route");
const invoiceRoute = require("./routes/invoice.route");

app.use(cors()); //use cors
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); //for each request, parse body of request

app.use(express.static("public"));

//db connection
mongoose.connect(process.env.DB_CONNECTION_STRING),
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  };
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/customer", customerRoute);
app.use("/todo", todoRoute);
app.use("/product", productRoute);
app.use("/offer", offerRoute);
app.use("/contractNote", contractNoteRoute);
app.use("/invoice", invoiceRoute);

app.listen(port, () => console.log(`Listening on port ${port}`));

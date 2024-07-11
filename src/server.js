import express from "express";
import bodyParser from "body-parser";
import viewengine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import connectDB from "./config/connectDB"
// import cors from "cors";

require('dotenv').config();
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', process.env.URL_REACT);

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});


viewengine(app);
initWebRoutes(app);
connectDB();
let port = process.env.PORT || 2004;
app.listen(port, () => {
    console.log("The web is running on port " + port)
});
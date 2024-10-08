import express from "express";
import bodyParser from "body-parser";
import viewengine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import connectDB from "./config/connectDB"
// import cors from "cors";

require('dotenv').config();
let app = express();

app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', process.env.URL_REACT);

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

viewengine(app);
initWebRoutes(app);
connectDB();
let port = process.env.PORT || 2004;
app.listen(port, () => {
    console.log("The web is running on port " + port)
});
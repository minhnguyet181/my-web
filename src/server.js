import express from "express";
import bodyParser from "body-parser";
import viewengine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
require('dotenv').config();
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
viewengine(app);
initWebRoutes(app);

let port = process.env.PORT || 2004;
app.listen(port, () => {
    console.log("The web is running on port " + port)
});
import express from "express";
import homeControl from "../controllers/homeControl";
let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeControl.getHomePage);
    router.get('/moon', (req, res) => {
        return res.send('To be no1 ')
    });
    router.get('/tobeno1', homeControl.getViewPage);
    return app.use("/", router);

}

module.exports = initWebRoutes;
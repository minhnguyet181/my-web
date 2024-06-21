import express from "express";
import homeControl from "../controllers/homeControl";
let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeControl.getHomePage);
    router.get('/moon', (req, res) => {
        return res.send('To be no1 ')
    });
    router.get('/tobeno1', (req, res) => {
        return res.render('crud.ejs');
    });
    router.post('/post-crud', homeControl.postCRUD);
    return app.use("/", router);

}

module.exports = initWebRoutes;
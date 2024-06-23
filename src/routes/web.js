import express from "express";
import homeControl from "../controllers/homeControl";
let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeControl.getHomePage);
    router.get('/moon', (req, res) => {
        return res.send('To be no1 ')
    });
    router.get('/tobeno1', homeControl.getViewPage);
    router.post('/post-crud', homeControl.postCRUD);
    router.get('/getcrud', homeControl.getcrud);
    router.get('/edit-crud', homeControl.editCrud);
    router.post('/put-crud', homeControl.putCrud);
    router.get('/delete-crud', homeControl.deleteCrud);


    return app.use("/", router);

}

module.exports = initWebRoutes;
import express from "express";
import homeControl from "../controllers/homeControl";
import userController from "../controllers/userController";


let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeControl.getHomePage);
    router.get('/moon', (req, res) => {
        return res.send('To be no1 ')
    });
    router.get('/crud', homeControl.createUser);
    router.post('/post-crud', homeControl.postCRUD);
    router.get('/getcrud', homeControl.getcrud);
    router.get('/edit-crud', homeControl.editCrud);
    router.post('/put-crud', homeControl.putCrud);
    router.get('/delete-crud', homeControl.deleteCrud);
    router.post('/api/login', userController.handleLogin);
    router.get('/api/get-all-users', userController.handleAllUser);
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    // router.put('/api/edit-user', userController.handleEditNewUser);
    // router.delete('/api/delete-user', userController.handleDeleteNewUser);
    return app.use("/", router);

}

module.exports = initWebRoutes;
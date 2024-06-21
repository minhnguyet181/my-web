import db from "../models/index";
import Crudservice from "../services/Crudservice";
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();

        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        });

    } catch (e) {
        console.log(e);
    }

    let data = await db.user.findAll();
    return res.render('homepage.ejs');
}
let getViewPage = (req, res) => {
    return res.render('crud.ejs');
}
let postCRUD = async (req, res) => {
    let message = await Crudservice.crNewUser(req.body);
    console.log(message);
    return res.send('post crud from server');
}

module.exports = {
    getHomePage: getHomePage,
    getViewPage: getViewPage,
    postCRUD: postCRUD,
}
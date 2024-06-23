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
let getcrud = async (req, res) => {
    let data = await Crudservice.getAlluser();
    console.log('----------');
    console.log(data);
    console.log('----------');
    return res.render('display-crud.ejs', {
        dataTable: data
    })
}
let postCRUD = async (req, res) => {
    let message = await Crudservice.crNewUser(req.body);
    console.log(message);
    return res.send('post crud from server');
}
let editCrud = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await Crudservice.getUserIdentify(userId);
        return res.render('editCrud')
    }
    else {
        return res.send('ming xing da ');
    }
}



module.exports = {
    getHomePage: getHomePage,
    getViewPage: getViewPage,
    getcrud: getcrud,
    postCRUD: postCRUD,
    editCrud: editCrud,
}
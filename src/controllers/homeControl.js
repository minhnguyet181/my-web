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
        return res.render('editCrud', {
            user: userData
        })
    }
    else {
        return res.send('ming xing da ');
    }
}
let putCrud = async (req, res) => {
    let data = req.body
    let allusers = await Crudservice.updateUserData(data);
    return res.render('display-crud', {
        dataTable: allusers
    })
}
let deleteCrud = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await Crudservice.deleteCrud(id);
        return res.send('user has been deleted successful')
    }
    else {
        return res.send('user not found')
    }

}

module.exports = {
    getHomePage: getHomePage,
    getViewPage: getViewPage,
    getcrud: getcrud,
    postCRUD: postCRUD,
    editCrud: editCrud,
    putCrud: putCrud,
    deleteCrud: deleteCrud,
}
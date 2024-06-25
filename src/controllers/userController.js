import db from "../models/index";
import Userservice from "../services/Userservice";

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs password',
        })

    }
    let userData = await Userservice.handleUserLogin(email, password);
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.message,
        user: userData.user ? userData.user : {}
    })
}
let handleAllUser = async (req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            message: 'Error',
            users: []
        })
    }
    let users = await Userservice.getAllusers(id);
    return res.status(200).json({
        errCode: 0,
        message: 'done',
        users
    })
}
let handleCreateNewUser = async (req, res) => {
    let message = await Userservice.createNewUser(req.body);
    console.log(message)
    return res.status(200).json(message);
}


module.exports = {
    handleLogin: handleLogin,
    handleAllUser: handleAllUser,
    handleCreateNewUser: handleCreateNewUser,
}
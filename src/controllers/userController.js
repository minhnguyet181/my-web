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
    let id = req.body.id;
    let users = await Userservice.getAllusers(id);
    return res.status(200).json({
        errCode: 0,
        message: 'done',
        users
    })
}


module.exports = {
    handleLogin: handleLogin,
    handleAllUser: handleAllUser,
}
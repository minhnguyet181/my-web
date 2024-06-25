import { where } from "sequelize"
import db from "../models/index"
import bcrypt from "bcryptjs"
let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUseremail(email);

            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password'],
                    where: { email: email },
                    raw: true,
                    // attributes: {
                    //     include: ['email', 'roleId'],
                    // }
                });
                if (user) {
                    let check = true;
                    // let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.message = 'done';

                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.message = 'Wrong password';
                    }
                } else {
                    userData.errCode = 2;
                    userData.message = 'User not found';

                }
            } else {
                userData.errCode = 1;
                userData.message = 'Your email or your password is incorrect. Please enter the right information';

            }
            resolve(userData);
        } catch (e) {
            reject(e);
        }
    })
}

let checkUseremail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            } else { resolve(false) }
        } catch (e) {
            reject(e);
        }
    })
}
let getAllusers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'all') {
                users = await db.User.findAll({

                })
            } else {
                users = await db.User.findOne({
                    where: { id: userId }
                })
            }

        } catch (e) {
            reject(e);
        }

    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    checkUseremail: checkUseremail,
    getAllusers: getAllusers,
}
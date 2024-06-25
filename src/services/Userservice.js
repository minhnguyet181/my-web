import { where } from "sequelize"
import db from "../models/index"
import bcrypt from "bcryptjs"
const salt = bcrypt.genSaltSync(10);
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
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            } if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users)
        } catch (e) {
            reject(e);
        }

    })
}
let hashPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashpw = await bcrypt.hashSync(password, salt);
            resolve(hashpw);
        } catch (e) {
            reject(e);
        }
    })

}
let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkUseremail(data.email);
            if (check) {
                resolve({
                    errCode: 1,
                    message: 'Your email is exist. Please try another email'
                })
            }
            let hashPW = await hashPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPW,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
            })
            resolve({
                errCode: 0,
                message: 'Done'
            });

        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    checkUseremail: checkUseremail,
    getAllusers: getAllusers,
    createNewUser: createNewUser,
}
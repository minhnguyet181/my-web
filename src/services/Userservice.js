import { where } from "sequelize"
import db from "../models/index"
import bcrypt from "bcryptjs"
import { resolveInclude } from "ejs";
// import { all } from "sequelize/types/lib/operators";
const salt = bcrypt.genSaltSync(10);
let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUseremail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password', 'firstName', 'lastName'],
                    where: { email: email },
                    raw: true,
                });
                if (user) {

                    let check = await bcrypt.compareSync(password, user.password);
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
            if (check === true) {
                resolve({
                    errCode: 1,
                    message: 'Your email is exist. Please try another email'
                })
            } else {
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
            }

            resolve({
                errCode: 0,
                message: 'Done'
            });

        } catch (e) {
            reject(e);
        }
    })
}
let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        let foundUser = await db.User.findOne({
            where: { id: userId }
        })
        if (!foundUser) {
            resolve({
                errCode: 2,
                message: 'The user is not found'
            })
        }
        await db.User.destroy({
            where: { id: userId }
        })
        resolve({
            errCode: 0,
            message: 'The user is deleted successfully'
        })
    })
}
let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    message: 'Missing required parameter'
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: true
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                await user.save();
                resolve({
                    errCode: 0,
                    message: 'Update user succeed'
                })
            } else {
                resolve({
                    errCode: 1,
                    message: 'User is not found'
                })
            }
        }
        catch (e) {
            reject(e)
        }
    })
}
let getAllCodes = (typeIp) => {

    return new Promise(async (resolve, reject) => {
        try {
            if (!typeIp) {
                resolve({
                    errCode: 1,
                    message: 'Error'
                })
            } else {
                let res = {};
                let allcode = await db.Allcode.findAll({
                    where: { type: typeIp }
                });
                res.errCode = 0;
                res.data = allcode;

                resolve(res);
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
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
    getAllCodes: getAllCodes,
}
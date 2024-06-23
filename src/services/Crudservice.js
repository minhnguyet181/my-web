import bcrypt from 'bcryptjs';
import db from '../models/index';
import { raw } from 'body-parser';
import { where } from 'sequelize';
const salt = bcrypt.genSaltSync(10);
let crNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
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
            resolve('A new user created successfully');
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
let getAlluser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw: true,
            });
            resolve(users);
        }
        catch (e) {
            reject(e);
        }
    }
    )
}
let getUserIdentify = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }, raw: true,
            })
            if (user) {
                resolve(user);
            } else {
                resolve([]);
            }
        } catch (e) {
            reject(e);
        }
    })

}
let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id }
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.phoneNumber = data.phoneNumber;
                await user.save();
                let alluser = await db.User.findAll({
                    raw: true,
                });
                resolve(alluser);
            } else {
                resolve();
            }

        } catch (e) {
            console.log(e);
        }
    })
}
let deleteCrud = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: id }
            })
            if (user) {
                await user.destroy();
            }
            resolve();
        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    crNewUser: crNewUser,
    hashPassword: hashPassword,
    getAlluser: getAlluser,
    getUserIdentify: getUserIdentify,
    updateUserData: updateUserData,
    deleteCrud: deleteCrud,
}
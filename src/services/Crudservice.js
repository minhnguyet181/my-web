import bcrypt from 'bcryptjs';
import db from '../models/index';
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
module.exports = {
    crNewUser: crNewUser,
    hashPassword: hashPassword,
}
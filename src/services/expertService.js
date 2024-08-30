
import { where } from "sequelize";
import db from "../models/index";

let getTopExpert = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limitInput,
                where: { roleId: 'R2' },
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    { model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] }],
                raw: true,
                nest: true
            })
            resolve({
                errCode: 0,
                data: users
            })
        }
        catch (e) {

            reject(e);
        }
    })
}
let getDetailExpert = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    message: 'Missing required parameter!'
                })
            } else {
                let data = await db.User.findOne({
                    where: { id: inputId },
                    attributes: {
                        exclude: ['password', 'image']
                    }, include: [
                        {
                            model: db.Markdown,
                            attributes: ['description', 'contentHTML', 'contentMarkdown']
                        },
                        { model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
                    ],
                    raw: true,
                    nest: true
                })
                resolve({
                    errCode: 0,
                    data: data
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}
let getAllExperts = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let experts = await db.User.findAll({
                where: { roleId: 'R2' },
                attributes: {
                    exclude: ['password']
                }
            })
            resolve({
                errCode: 0,
                data: experts
            })

        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    getTopExpert: getTopExpert,
    getDetailExpert: getDetailExpert,
    getAllExperts: getAllExperts
}
import { where } from "sequelize";
import db from "../models/index";
require('dotenv').config();
import _ from 'lodash';
import { raw } from "body-parser";
const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;
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
let saveExperts = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputData.id || !inputData.contentHTML || !inputData.contentMarkdown) {
                resolve({
                    errCode: 1,
                    message: 'Missing parameter'
                })
            } else {
                await db.Markdown.create({
                    contentHTML: inputData.contentHTML,
                    contentMarkdown: inputData.contentMarkdown,
                    description: inputData.description,
                    expertId: inputData.expertId
                })
            }
            resolve({
                errCode: 0,
                message: 'Save infor succeed'
            })

        } catch (e) {
            reject(e)
        }
    })
}
let bulkSchedule =(data) =>{
return new Promise (async (resolve,reject) =>{
    try{
      if(!data.arrSchedule || !data.expertId || !data.formatedDate) {
        resolve ({
            errCode:1,
            message:'Missing required para'
        })
      } else{
        let schedule = data.arrSchedule;
        if (schedule && schedule.length >0 ){
            schedule = schedule.map(item =>{
                item.maxNb = MAX_NUMBER_SCHEDULE;
                return item;
            })
        }
        let existing = await db.Schedule.findAll(
            {
                where:{ expertId: data.expertId,
                    date: data.formatedDate
                },
                attributes:['timeType', 'date', 'expertId', 'maxNb'],
                raw:true
            }
        );
        if( existing && existing.length >0){
            existing = existing.map(item =>{
                item.date = new Date(item.date).getTime();
                return item;
            })
        }
        let toCreate = _.differenceWith(schedule,existing,(a,b)=>{
            return a.timeType === b.timeType && a.date === b.date;
        });
        if( toCreate && toCreate.length >0)
        {
            await db.Schedule.bulkSchedule(toCreate);
        }
        resolve({
            errCode:0,
            message:"Done!"
        })
      }
    } catch(e) {
        reject(e)
    }
})
}
let getScheduleExpertByDate = (id, date) => {
    return new Promise((async (resolve, reject) => {
        try {
            let schedule = await db.Schedule.findAll({
                where: {
                    expertId: id, date: date, sumBooking: { [Op.lt]: maxBooking }
                }
            });
            let expert = await getExpertById(id);

            let dateNow = new Date();
            let currentDate = moment().format('DD/MM/YYYY');
            let currentHour = `${dateNow.getHours()}:${dateNow.getMinutes()}`;
            let timeNow = moment(`${currentDate} ${currentHour}`, "DD/MM/YYYY hh:mm").toDate();

            schedule.forEach((sch, index) => {
                let startTime = sch.time.split('-')[0];
                let timeSchedule = moment(`${sch.date} ${startTime}`, "DD/MM/YYYY hh:mm").toDate();
                //isDisable nếu time hiện tại > time kế hoạch
                sch.setDataValue('isDisable', timeNow > timeSchedule);

            });

            resolve({
                schedule: schedule,
                expert:expert
            });
        } catch (e) {
            reject(e);
        }
    }));
};
let getExpertById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let doctor = await db.User.findOne({
                where: { id: id, roleId: 'R2' }
            });
            resolve(doctor);
        } catch (e) {
            reject(e);
        }
    });
};
module.exports = {
    getTopExpert: getTopExpert,
    getDetailExpert: getDetailExpert,
    getAllExperts: getAllExperts,
    saveExperts: saveExperts,
    bulkSchedule:bulkSchedule,
    getExpertById: getExpertById,
    getScheduleExpertByDate:getScheduleExpertByDate
}
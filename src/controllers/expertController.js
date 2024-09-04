import expertService from "../services/expertService";

let getTopExpert = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;

    try {
        let resp = await expertService.getTopExpert(+limit);
        return res.status(200).json(resp);

    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: 'Error from service....'
        })
    }
}
let getAllExpert = async (req, res) => {
    try {
        let experts = await expertService.getAllExperts();
        console.log(experts);
        return res.status(200).json(experts)

    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: 'ERROR!!!!!'
        })
    }
}
let getInfoExpert = async (req, res) => {
    try {
        let info = await expertService.getDetailExpert(req.query.id);
        return res.status.json(info)

    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            message: 'Error from service.....'
        })
    }
}
let saveInfoExpert = async (req, res) => {
    try {
        let resp = await expertService.saveExperts(req.body);
        return res.status(200).json(resp)

    } catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: 'Error!!!!!!!!!'
        })
    }
}
let bulkSchedule = async(req,res) =>{
    try{
    let infor = await expertService.bulkSchedule(req.body);
    return res.status(200).json(infor)
    } catch(e) {
        return res.status(200).json({
            errCode: -1,
            message: 'Error!!!!!!!!!'
        })
    }
}
let getScheduleExpertByDate = async (req, res) => {
    try {
        let object = await expertService.getScheduleExpertByDate(req.body.expertId, req.body.date);
        let data = object.schedule;
        let expert = object.expert;
        return res.status(200).json({
            status: 1,
            message: data,
            expert: expert
        });
    } catch (e) {
        console.log(e)
        return res.status(500).json(e);
    }
};
module.exports = {
    getTopExpert: getTopExpert,
    getInfoExpert: getInfoExpert,
    getAllExpert: getAllExpert,
    saveInfoExpert: saveInfoExpert,
    bulkSchedule:bulkSchedule,
    getScheduleExpertByDate:getScheduleExpertByDate
}
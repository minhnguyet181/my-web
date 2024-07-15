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
module.exports = {
    getTopExpert: getTopExpert,
}
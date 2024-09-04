'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Schedule extends Model {

        static associate(models) {

            // define association here
        }
    };
    Schedule.init({
        currentNumber: DataTypes.INTEGER,
        maxNumber: DataTypes.INTEGER,
        date: DataTypes.STRING,
        timeType: DataTypes.STRING,
        expertId: DataTypes.INTEGER,

    }, {
        sequelize,
        modelName: 'Schedule',
    });
    return Schedule;
};
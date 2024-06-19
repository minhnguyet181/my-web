'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Booking extends Model {

        static associate(models) {

            // define association here
        }
    };
    Booking.init({
        statusId: DataTypes.STRING,
        expertId: DataTypes.INTEGER,
        guessId: DataTypes.INTEGER,
        date: DataTypes.DATE,
        timeType: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: 'Booking',
    });
    return Bookings;
};
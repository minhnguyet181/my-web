'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Spa extends Model {

        static associate(models) {

            // define association here
        }
    };
    Spa.init({
        address: DataTypes.STRING,
        description: DataTypes.TEXT,
        image: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Spa',
    });
    return Spa;
};
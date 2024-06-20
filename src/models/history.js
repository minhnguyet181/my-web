'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class History extends Model {

        static associate(models) {

            // define association here
        }
    };
    History.init({
        guessId: DataTypes.INTEGER,
        expertId: DataTypes.INTEGER,
        description: DataTypes.TEXT,
        files: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'History',
    });
    return History;
};
'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Expert extends Model {

        static associate(models) {
            // define association here
        }
    };
    Expert.init({
        expertId: DataTypes.INTEGER,
        spaId: DataTypes.INTEGER,
        specialtyId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Expert',
    });
    return Expert;
};
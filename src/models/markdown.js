'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Markdown extends Model {

        static associate(models) {
            Markdown.belongsTo(models.User, { foreignKey: 'doctorId' })
            // define association here
        }
    };
    Markdown.init({
        contentHTML: DataTypes.TEXT('long'),
        contentMarkdown: DataTypes.TEXT('long'),
        description: DataTypes.TEXT('long'),
        expertId: DataTypes.INTEGER,
        specialtyId: DataTypes.INTEGER,
        agencyId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Markdown',
    });
    return Markdown;
};
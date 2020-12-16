const { DataTypes } = require('sequelize');

const db = require('../db');

const Speciality = db.define('speciality', {
    name: {
        type: DataTypes.STRING,
    },
    fac_id: {
        type: DataTypes.INTEGER,
    }
}, {
    underscored: true,
    freezeTableName: true,
    timestamps: false,
});

Speciality.associate = models => {
    Speciality.hasMany(models.Students, {
        foreignKey: 's_id',
    });
    Speciality.belongsTo(models.Faculty, {
        foreignKey: 'fac_id',
    });
}

module.exports = Speciality;
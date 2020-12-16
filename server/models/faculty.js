const { DataTypes } = require('sequelize');

const db = require('../db');


const Faculty = db.define('faculty', {
    name: {
        type: DataTypes.STRING,
    }
}, {
    underscored: true,
    freezeTableName: true,
    timestamps: false,
});

Faculty.associate = models => {
    Faculty.hasMany(models.Students, {
        foreignKey: 'f_id'
    });
    Faculty.hasMany(models.Speciality, {
        foreignKey: 'fac_id'
    });
}

module.exports = Faculty;
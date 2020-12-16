const { DataTypes } = require('sequelize');

const db = require('../db');

const Students = db.define('students', {
    s_id: {
        type: DataTypes.INTEGER,
    },
    f_id: {
        type: DataTypes.INTEGER,
    },
    curs: {
        type: DataTypes.INTEGER,
    },
    pip: {
        type: DataTypes.STRING,
    },
    b_date: {
        type: DataTypes.DATE,
        get() {
            const time = new Date(this.getDataValue('b_date')).toLocaleString('ru', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            return time;
        }
    }
}, {
    underscored: true,
    freezeTableName: true,
    timestamps: false,
});

Students.associate = models => {

    Students.belongsTo(models.Faculty, {
        foreignKey: 'f_id',
    });
    Students.belongsTo(models.Speciality, {
        foreignKey: 's_id',
    });
}

module.exports = Students;
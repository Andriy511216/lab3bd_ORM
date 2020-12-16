const {Router} =  require('express');
const router = Router();
const Students = require('../models/students');
const { Op } = require('sequelize');

router.get('/students', async (req, res) => {
    try {
        const studentses = await Students.findAll();
        res.json(studentses);
    }catch (e) {
        res.status(400).json(e);
    }
});

router.post('/students/search', async (req, res) => {
    try {
        const {pip, curs, f_id, s_id, b_date} = req.body;
        const where = {
            curs,
            f_id,
            s_id,
            pip: {
                [Op.iLike]: `%${pip}%`,
            },
            b_date,
        };
        Object.keys(where).forEach(key => {
            if(where[key] === undefined) {
                delete where[key];
            }
        });
        const studentses = await Students.findAll({
            where,
        });
        res.json(studentses);
    } catch (e) {
        res.status(400).json(e);
    }
});

router.post('/students/new', async (req, res) => {
    try {
        const newStudents = await Students.create({
            ...req.body,
        });
        res.json(newStudents);
    } catch (e) {
        res.status(400).json(e);
    }
});


router.delete('/students/:id', async (req, res) => {
    try {
        const response = await Students.destroy({
            where: {
                id: req.params.id
            }
        });

        res.json(response);
    } catch (e) {
        res.status(400).json(e);
    }
});

router.put('/students/:id', async (req, res) => {
    try {
        let updatedStudents = await Students.update({
            ...req.body,
        }, {
            where: {
                id: req.params.id
            }
        });
        if(updatedStudents) {
            updatedStudents = await Students.findOne({
                where: {
                    id: req.params.id
                }
            });
        }
        res.json(updatedStudents);
    } catch (e) {
        res.status(400).json(e);
    }
});

module.exports = router;
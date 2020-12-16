const {Router} =  require('express');
const router = Router();
const Speciality = require('../models/speciality');
const { Op } = require('sequelize');

router.get('/speciality', async (req, res) => {
    try {
        const specialitys = await Speciality.findAll();
        res.json(specialitys);
    }catch (e) {
        res.status(400).json(e);
    }
});

router.post('/speciality/search', async (req, res) => {
    try {
        const {name, fac_id} = req.body;
        const where = {
            fac_id,
            name: {
                [Op.iLike]: `%${name}%`,
            },
        };
        Object.keys(where).forEach(key => {
            if(where[key] === undefined) {
                delete where[key];
            }
        });
        const specialitys = await Speciality.findAll({
            where,
        });
        res.json(specialitys);
    } catch (e) {
        res.status(400).json(e);
    }
});

router.post('/speciality/new', async (req, res) => {
    try {
        const newSpeciality = await Speciality.create({
            ...req.body,
        });
        res.json(newSpeciality);
    } catch (e) {
        res.status(400).json(e);
    }
});


router.delete('/speciality/:id', async (req, res) => {
    try {
        const response = await Speciality.destroy({
            where: {
                id: req.params.id
            }
        });

        res.json(response);
    } catch (e) {
        res.status(400).json(e);
    }
});

router.put('/speciality/:id', async (req, res) => {
    try {
        let updatedSpeciality = await Speciality.update({
            ...req.body,
        }, {
            where: {
                id: req.params.id
            }
        });
        if(updatedSpeciality) {
            updatedSpeciality = await Speciality.findOne({
                where: {
                    id: req.params.id
                }
            });
        }
        res.json(updatedSpeciality);
    } catch (e) {
        res.status(400).json(e);
    }
});

module.exports = router;
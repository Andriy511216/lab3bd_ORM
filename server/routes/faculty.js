const {Router} =  require('express');
const router = Router();
const Faculty = require('../models/faculty');
const { Op, QueryTypes } = require('sequelize');
const db = require('../db');

router.get('/faculty', async (req, res) => {
    try {
        const facultys = await Faculty.findAll();
        res.json(facultys);
    }catch (e) {
        res.status(400).json(e);
    }
});

router.post('/faculty/search', async (req, res) => {
    try {
        const {name} = req.body;
        const facultys = await Faculty.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            }
        });
        res.json(facultys);
    } catch (e) {
        res.status(400).json(e);
    }
});

router.post('/faculty/new', async (req, res) => {
   try {
       const {name} = req.body;
       const newFaculty = await Faculty.create({
           name
       });
       res.json(newFaculty);
   } catch (e) {
       res.status(400).json(e);
   }
});


router.delete('/faculty/:id', async (req, res) => {
    try {
        const response = await Faculty.destroy({
            where: {
                id: req.params.id
            }
        });

        res.json(response);
    } catch (e) {
        res.status(400).json(e);
    }
});

router.put('/faculty/:id', async (req, res) => {
   try {
       console.log(req.params.id, 'body', req.body);

       const {name} = req.body;
       let updatedFaculty = await Faculty.update({
           name: name,
       }, {
            where: {
                id: req.params.id
            }
       });
       if(updatedFaculty) {
           updatedFaculty = await Faculty.findOne({
               where: {
                   id: req.params.id
               }
           });
       }
       res.json(updatedFaculty);
   } catch (e) {
       res.status(400).json(e);
   }
});

router.post('/faculty/rand', async(req, res) => {
    try {
        const {count} = req.body;
        console.log(count);
        let response = await db.query(`INSERT INTO faculty(name) select getrandomstring(10) as name from generate_series(1, ${count});`, { type: QueryTypes.INSERT });
        response = await db.query( `SELECT * FROM faculty ORDER BY id DESC FETCH FIRST ${count} ROW ONLY;`, { type: QueryTypes.SELECT });
        console.log(response);
        res.json(response);
    } catch (error) {
        res.status(400).json('Error');

        console.log(error.message);
    }
})


module.exports = router;
const express = require('express');

const router = express.Router();

const {
    setNewCinema,
    getCinema,
    modCinema,
    deleteCinema,
    getCinemaById,
} = require('../controllers/cinema.controller');

router.get('/cinemas', getCinema);
router.post('/', setNewCinema);
router.put('/:id', modCinema);
router.delete('/:id', deleteCinema);
router.get('/:id', getCinemaById);

module.exports = router;

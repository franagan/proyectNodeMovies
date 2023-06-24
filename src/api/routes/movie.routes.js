const express = require('express');
const upload = require('../../middlewares/upload.file');

const router = express.Router();

const {
    getAllMovies,
    setNewMovie,
    getMovieId,
    getMovieTitle,
    getMovieGenre,
    getMovieYear,
    modMovie,
    deleteMovie,
    postMovie,
} = require('../controllers/movie.controller');

router.get('/title/:title', getMovieTitle);
router.get('/genre', getMovieGenre);
router.get('/year/:year', getMovieYear);
router.put('/:id', modMovie);
router.delete('/:id', deleteMovie);
router.get('/movies', getAllMovies);
router.get('/:id', getMovieId);
// router.post('/modmovie', setNewMovie);
router.post('/', upload.single('image'), postMovie);
/**
 *
 *
 */
module.exports = router;

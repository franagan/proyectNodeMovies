const { query } = require('express');
const Movie = require('../models/movie.model');
const Movies = require('../models/movie.model');

const getAllMovies = async (req, res) => {
    try {
        const allMovies = await Movie.find();
        return res.json(allMovies);
    } catch (error) {
        console.log(error);
    }
};

const getMovieId = async (req, res) => {
    try {
        console.log(req.params);
        let { id } = req.params;
        console.log(id);
        const movieId = await Movie.findById(id);
        if (!movieId) {
            return res.status(404).json({ mensaje: 'id no encontrada' });
        }
        return res.status(200).json(movieId);
    } catch (error) {
        return res.status(500).json(error);
    }
};

const getMovieTitle = async (req, res) => {
    try {
        console.log(req.params);
        let { title } = req.params;
        console.log(title);
        const movieTitle = await Movie.find({
            title: title,
        });
        if (!movieTitle) {
            return res.status(404).json({ mensaje: 'Title no encontrado' });
        }
        return res.status(200).json(movieTitle);
    } catch (error) {
        return res.status(500).json(error);
    }
};

const getMovieGenre = async (req, res) => {
    try {
        console.log(req.query);
        let { genre } = req.query;
        const movieGenre = await Movie.find({
            genre: genre,
        });
        if (!movieGenre) {
            return res.status(404).json({ mensaje: 'genero no encontrado' });
        }
        return res.status(200).json(movieGenre);
    } catch (error) {
        return res.status(500).json(error);
    }
};

const getMovieYear = async (req, res) => {
    try {
        let { year } = req.params;
        console.log(year);
        const movieYear = await Movie.find({
            year: { $gt: year },
        });
        if (!movieYear) {
            return res.status(404).json('no year');
        }
        return res.status(200).json(movieYear);
    } catch (error) {
        return res.status(500).json(error);
    }
};

const setNewMovie = async (req, res) => {
    try {
        const newMovie = new Movie(req.body);
        const createdMovie = await newMovie.save();
        return res.status(200).json(createdMovie);
    } catch (error) {
        return res.status(500).json(error);
    }
};

const modMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const putMovie = new Movie(req.body);
        putMovie._id = id;
        const updateMovie = await Movie.findByIdAndUpdate(id, putMovie, {
            new: true,
        });
        return res.status(200).json(updateMovie);
    } catch (error) {
        return res.status(500).json(error);
    }
};

const deleteMovie = async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;
        const deleteMovie = await Movie.findByIdAndDelete(id);
        if (!deleteMovie) {
            return res.status(404).json({ mensaje: 'movie no encontrada' });
        }
        return res.status(200).json(deleteMovie);
    } catch (error) {
        return res.status(500).json(error);
    }
};

const postMovie = async (req, res) => {
    console.log(req.body);
    try {
        console.log(req.body);
        console.log(req.file.path);
        const newMovie = new Movie(req.body);
        if (req.file.path) {
            newMovie.image = req.file.path;
        }
        const createdMovie = await newMovie.save();

        return res.status(200).json(createdMovie);
    } catch (error) {
        return res.status(400).json(error);
    }
};

module.exports = {
    getAllMovies,
    setNewMovie,
    getMovieId,
    getMovieTitle,
    getMovieGenre,
    getMovieYear,
    modMovie,
    deleteMovie,
    postMovie,
};

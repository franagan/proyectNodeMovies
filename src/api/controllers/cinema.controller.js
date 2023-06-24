const { query } = require('express');
const Cinema = require('../models/cinema.model');

const getCinema = async (req, res) => {
    try {
        const allCinemas = await Cinema.find().populate('movies');
        return res.json(allCinemas);
    } catch (error) {
        console.log(error);
    }
};

const getCinemaById = async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;
        console.log(id);
        const cinemaId = await Cinema.findById(id).populate('movies');
        if (!cinemaId) {
            return res.status(404).json({ mensaje: 'id no encontrada' });
        }
        return res.status(200).json(cinemaId);
    } catch (error) {
        return res.status(500).json(error);
    }
};

const setNewCinema = async (req, res) => {
    try {
        const newCinema = new Cinema(req.body);
        const createdCinema = await newCinema.save();
        return res.status(200).json(createdCinema);
    } catch (error) {
        return res.status(500).json(error);
    }
};

const modCinema = async (req, res) => {
    try {
        const { id } = req.params;
        const putCinema = new Cinema(req.body);
        putCinema._id = id;
        const updateCinema = await Cinema.findByIdAndUpdate(id, putCinema, {
            new: true,
        });
        return res.status(200).json(updateCinema);
    } catch (error) {
        return res.status(500).json(error);
    }
};

const deleteCinema = async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;
        const deleteCinema = await Cinema.findByIdAndDelete(id);
        if (!deleteCinema) {
            return res.status(404).json({ mensaje: 'cine no encontrado' });
        }
        return res.status(200).json(deleteCinema);
    } catch (error) {
        return res.status(500).json(error);
    }
};

module.exports = {
    setNewCinema,
    getCinema,
    modCinema,
    deleteCinema,
    getCinemaById,
};

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Movies = require('../api/models/movie.model');
dotenv.config();

const movies = [
    {
        id: 1,
        title: 'The Matrix',
        director: 'Hermanas Wachowski',
        year: 1999,
        genre: 'Acción',
    },
    {
        id: 2,
        title: 'The Matrix Reloaded',
        director: 'Hermanas Wachowski',
        year: 2003,
        genre: 'Acción',
    },
    {
        id: 3,
        title: 'Buscando a Nemo',
        director: 'Andrew Stanton',
        year: 2003,
        genre: 'Animación',
    },
    {
        id: 4,
        title: 'Buscando a Dory',
        director: 'Andrew Stanton',
        year: 2016,
        genre: 'Animación',
    },
    {
        id: 5,
        title: 'Interestelar',
        director: 'Christopher Nolan',
        year: 2014,
        genre: 'Ciencia ficción',
    },
    {
        id: 6,
        title: '50 primeras citas',
        director: 'Peter Segal',
        year: 2004,
        genre: 'Comedia romántica',
    },
];

mongoose
    .connect(process.env.DB_URL)
    .then(async () => {
        const allMovies = await Movies.find();
        if (allMovies.length > 0) {
            await Movies.collection.drop();
            console.log('deleted movies');
        }
    })
    .catch((error) => console.log(`error borrando movies ${error}`))
    .then(async () => {
        const moviesMap = movies.map((movies) => new Movies(movies));
        await Movies.insertMany(moviesMap);
        console.log('inserted movies');
    })

    .catch((error) => console.log(`error creating movies ${error}`))
    .finally(() => mongoose.disconnect());

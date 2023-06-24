const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const moviesSchema = new Schema(
    {
        title: { type: String },
        director: { type: String },
        year: { type: Number },
        genre: { type: String },
        image: {
            type: String,
            required: false,
            default: '',
        },
    },
    {
        timestamp: true,
    },
    {
        collection: 'movie',
    }
);
const Movie = mongoose.model('movie', moviesSchema);
module.exports = Movie;

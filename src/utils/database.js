const mongoose = require('mongoose');

const DB_URL = process.env.DB_URL;

const connect = async () => {
    try {
        const db = await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const { name, host } = db.connection;
        console.log(`Base de datos: ${name} y host ${host}`);
    } catch (error) {}
};
module.exports = { connect };

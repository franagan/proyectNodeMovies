const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        email: { type: String, required: true },
        password: { type: String, required: true },
        role: {
            type: String,
            default: 'user',
            enum: ['admin', 'user', 'consult'],
        },
        name: { type: String, required: true },
        lastname: { type: String },
        phone: { type: Number },
    },
    {
        timestamps: true,
    },
    {
        collection: 'users',
    }
);

const User = mongoose.model('users', UserSchema);
module.exports = User;

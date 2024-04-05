// Imports Schema and Model from Mongoose Library
const { Schema, model } = require('mongoose');

// Mongoose Schema for User
const userSchema = new Schema (
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Enter Valid Email Address']
        }
    }
)

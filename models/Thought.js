// Imports Required from Mongoose Library and Other Files
const { Schema, model } = require('mongoose');
const formatDate = require('../utils/dateFormat')
const Reaction = require('./Reaction');

// Mongoose Schema for User Thoughts
const thoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => formatDate(date)
        },
        username: {
            type: String,
            required: true
        },
        reactions: [Reaction],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);
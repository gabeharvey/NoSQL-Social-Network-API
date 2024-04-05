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
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: "Thought",
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: "User",
        }],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Adds Virtual friendCount to userSchema
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// Creates Mongoose Model
const User = model('User', userSchema);

// Exports User Model
module.exports = User;

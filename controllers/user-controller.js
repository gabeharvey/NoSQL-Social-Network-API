// Import Models
const User = require('../models/User');
const Thought = require('../models/Thought');

const getUsers = (req, res) => {
    User.find ().then((users) => res.json(users))
    .catch((err) => res.status(500).json(err));
};

const getSingleUser = (req, res) => {
    User.findOne ({ _id: req.params.userId }).select('-__v')
    .populate('friends')
    .populate('thoughts')
    .then((user) => !user ?res.status(404).json({ message: 'Invalid Id'})
    : res.json(user))
    .catch((err) => res.status(500).json(err));
};

const createUser = (req, res) => {
    User.create ({
        username: req.body.username,
        email: req.body.email
    })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => res.status(500).json(err));
};

const updateUser = (req, res) => {
    User.findOneAndUpdate (
        { _id: req.params.userId },
        { username: req.body.username, email: req.body.email },
        { new: true },
        (err, result) => {
            if (result) {
                res.status(200).json(result);
                console.log(`Updated User: ${result}`);
            } else {
                console.log(err);
                res.status(500).json({ message: 'User Not Updated', err });
            }
        }
    );
};

module.exports = { getUsers, getSingleUser, createUser, updateUser };
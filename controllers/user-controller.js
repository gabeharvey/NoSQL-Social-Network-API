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

const deleteUser = (req, res) => {
    User.findOneAndRemove ({ _id: req.params.userId })
    .then((user) => !user ?res.status(404).json({ message: 'User Id Not Found' })
    : Thought.deleteMany ({ username: user.username })
    .then((thoughts) => !thoughts ? res.status(404).json({ message: 'User Thoughts Not Found'})
    : res.json(user)))
    .catch((err) => res.status(500).json(err));
};

const addFriend = (req, res) => {
    User.findOne ({ _id: req.params.friendId }).select('-__v')
    .then((user) => {
        return User.findOneAndUpdate (
            { _id: req.params.userId },
            { $addToSet: {
                friends: user._id
            }},
            { new: true }
        );
    })
    .then((user) => !user ? res.status(404).json({ message: 'User Id Not Found' })
    : res.json(user))
    .catch((err) => res.status(500).json(err));
};

const deleteFriend = (req, res) => {
    User.findOne ({ _id: req.params.friendId }).select('-__v')
    .then((friend => { 
        if (!friend) {
            return res.status(404).json({ message: "Friend Not Found" });
        }
        return User.findOneAndUpdate (
            { _id: req.params.userId },
            { $pull: {
                friends: friend._id
            }},
            { new: true }
        )    
        .then((user) => !user ? res.status(404).json({ message: 'User Id Not Found'}): res.json(user))
    }))
    .catch((err) => res.status(500).json(err))
};

module.exports = { getUsers, getSingleUser, createUser, updateUser, deleteUser, addFriend, deleteFriend };
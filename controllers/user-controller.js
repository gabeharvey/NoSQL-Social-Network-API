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

module.exports = { getUsers, getSingleUser };
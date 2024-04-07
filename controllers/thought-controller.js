// Import Models
const User = require('../models/User');
const Thought = require('../models/Thought');

const getThoughts = (req, res) => {
    Thought.find ().then((thoughts) => res.json(thoughts))
    .catch((err) => res.status(500).json(err));
};

const getSingleThought = (req, res) => {
    Thought.findOne ({ _id: req.params.thoughtId }).select('-__v')
    .populate('reactions')
    .then((thought) => !thought ? res.status(404).json({ message: 'No Thought Found' })
    : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
};

module.exports = { getThoughts, getSingleThought }
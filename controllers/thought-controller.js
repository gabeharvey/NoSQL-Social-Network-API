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

const createThought = (req, res) => {
    Thought.create ({
        thoughtText: req.body.thoughtText,
        username: req.body.username
    }).then((thought) => {
        return User.findOneAndUpdate (
            { username: req.body.username },
            { $addToSet: { thoughts: thought._id }},
            { new: true }
        );
    }).then((user) => !user ? res.status(404).json({ message: 'User Id Invalid / No Thought Created'})
    : res.json(user))
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
};

const updateThought = (req, res) => {
    Thought.findOneAndUpdate (
        { _id: req.params.thoughtId },
        { thoughtText: req.body.thoughtText, username: req.body.username },
        { new: true },
        (err, result) => {
            if (result) {
                res.status(200).json(result);
                console.log(`Updated Thought: ${result}`);
            } else {
                console.log(err);
                res.status(500).json({ message: 'Thought Not Updated', err });
            }
        }
    );
};

const deleteThought = (req, res) => {
    Thought.findOneAndRemove ({ _id: req.params.thoughtId })
    .then((thought) => !thought ? res.status(404).json({ message: 'No Thought Found' })
    : User.findOneAndUpdate (
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
    ))
    .then((user) => !user ? res.status(404).json({ message: 'No Thought Deleted', })
    : res.json({ message: 'Thought Deleted'}))
    .catch((err) => res.status(500).json(err));
};

const addReaction = (req, res) => {
    Thought.findOneAndUpdate (
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
    )
    .then((thought) => !thought ? res.status(404).json({ message: 'No Thought Found' })
    : res.json(`Added Reaction`))
    .catch((err) => res.status(500).json(err));
};

const removeReaction = (req, res) => {
    Thought.findOneAndUpdate (
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
    )
    .then((thought) => !thought ? res.status(404).json({ message: 'No Thought Found' })
    : res.json(`Deleted Reaction`))
    .catch((err) => res.status(500).json(err));
};

module.exports = { getThoughts, getSingleThought, createThought, updateThought, deleteThought, addReaction, removeReaction };
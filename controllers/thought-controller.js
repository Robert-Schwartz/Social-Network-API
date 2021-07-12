// Import models
const { Thought, User } = require('../models');

// Thought Controller Object
const thoughtController = {
    // Get all thoughts
    // ================================================
    getAllThoughts(req, res) {
        Thought.find({})
            .select('-__v')
            // sort in DESC order by the _id value
            .sort({ _id: -1 })
            .then(data => res.json(data))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // Get one thought by id
    // ================================================
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({
                path: 'thought',
                select: '-__v'
            })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(thoughtData => {
                // if no thought is found, send 404
                if (!thoughtData) {
                    res.status(404).json({ message: 'No Thought found with this id!' });
                    return;
                }
                res.json(thoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // ADD thought to user
    // ================================================
    createThought({ body }, res) {
        console.log(body);
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate({},
                    // $push to add thought's _id to specific user
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this ID' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
    // Update Thought by id
    /* With this .findOneAndUpdate() method, Mongoose finds a single document we want to update, then updates it and returns the updated document.*/
    // ================================================
    updateThought({ params, body }, res) {
        //include runValidators: true to it will validate any new information
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No Thought found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    // DELETE Thought
    // ================================================
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(deletedThought => {
                if (!deletedThought) {
                    res.status(404).json({ message: 'No thought with this id!' });
                    return;
                }
                res.json(deletedThought);
            })
            .catch(err => res.json(err));
    },
    // ADD Reaction
    //==============================================
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $addToSet: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then(reactionData => {
                if (!reactionData) {
                    res.status(404).json({ message: 'No reactions found with this id!' });
                    return;
                }
                res.json(reactionData);
            })
            .catch(err => res.json(err));
    },
    // Delete Reaction
    deleteReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: body } },
            { new: true }
        )
            .then(data => {
                if (!data) {
                    return res.status(404).json({ message: 'No reactions with this id!' });
                }
                res.json(data);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },
};

// export controller
module.exports = thoughtController;



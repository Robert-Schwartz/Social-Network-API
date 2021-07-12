//require User.js from models
const { User, Thought } = require('../models');

const userController = {
    // Get all users
    // ================================================
    getAllUsers(req, res) {
        User.find({})
            .select('-__v')
            // sort in DESC order by the _id value
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // Get one user by id
    // ================================================
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => {
                // if no User is found, send 404
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    // CreateUser
    // ================================================
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    // Update User by id
    /* With this .findOneAndUpdate() method, Mongoose finds a single document we want to update,
    then updates it and returns the updated document.*/
    // ================================================
    updateUser({ params, body }, res) {
        //include runValidators: true to it will validate any new information
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    // Delete User
    // ================================================
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    // ****************Friends - Sub Document *************************************

    // Add a Friend
    // ===========================================================
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $addToSet: { friends: params.friendId } },
            { new: true }
        )
            .then(friendData => {
                if (!friendData) {
                    res.status(404).json({ message: 'No friend with this id!' });
                    return;
                }
                // add friend to the other User: friends come in pairs
                User.findOneAndUpdate(
                    { _id: params.friendId },
                    { $addToSet: { friends: params.userId } },
                    { new: true }
                )
                    .then(friendData => {
                        if (!friendData) {
                            res.status(404).json({ message: 'No friend with this id!' });
                        }
                        res.json(friendData);
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json(err);
                    })
            })
    },


}

//export module
module.exports = userController;
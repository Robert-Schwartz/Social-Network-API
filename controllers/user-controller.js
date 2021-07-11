//require User.js from models
const { User, Thought } = require('../models');

const userController = {
    // Get all users
    // ================================================
    getAllUsers(req, res) {
        User.find({})
            //populate thoughts
            .populate({
                path: 'thought',
                select: '-__v'
                // The minus sign - in front of the field `__v` indicates that we don't want it to be returned.
            })
            .select('-__v')
            .sort({ _id: -1 })
            // sort in DESC order by the _id value
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
    /* With this .createUser() method, we destructure the body out of the Express.js req object because we don't need to interface with any of the other data it provides.*/
    // ================================================
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    // Update User by id
    /* With this .findOneAndUpdate() method, Mongoose finds a single document we want to update, then updates it and returns the updated document.*/
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
    }
}

//export module
module.exports = userController;
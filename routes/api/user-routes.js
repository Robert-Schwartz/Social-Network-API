// Require Express
const router = require('express').Router();

//Implement Controller Methods
// ============================================
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    createFriend,
    deleteFriend
    //BONUS: Remove a user's associated thoughts when deleted.
} = require('../../controllers/user-controller');

// Set up GET all and POST at /api/users
// /api/users
// ============================================
router
    // /api/users/
    .route('/')
    //provide the name of the controller method as the callback
    .get(getAllUsers)
    .post(createUser);

// Set up GET one, PUT, and DELETE at /api/users/:id
// ============================================
router
    // /api/users/:id
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);


// Set up Create Friend, Delete friend at /api/users/:userId/friends/:friendId
// ============================================
router
    // /api/users/:userId/friends/:friendId
    .route('/:id/friends/:friendId')
    .post(createFriend)
    .delete(deleteFriend);

module.exports = router;
// Require Express
const router = require('express').Router();

//Implement Controller Methods
// ============================================
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
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

module.exports = router;
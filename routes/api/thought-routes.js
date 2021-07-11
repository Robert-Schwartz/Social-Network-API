// Require Express
const router = require('express').Router();

//Implement Controller Methods
// ============================================
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

// Set up GET all and POST at /api/thoughts
// /api/thoughts
// ============================================
router
    // /api/thoughts/
    .route('/')
    //provide the name of the controller method as the callback
    .get(getAllThoughts)
    .post(createThought);
    //(don't forget to push the created thought's _id to the associated user's thoughts array field)


// Set up GET one, PUT, and DELETE at /api/thoughts/:id
// ============================================
router
    // /api/thoughts/:id
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);


// Set up Create Friend, Delete friend at /api/thoughts/:thoughtId/reactions
// ============================================
router
    // /api/thoughts/:thoughtId/reactions
    .route('/:id/friends/:friendId')
    // .post(createReaction)
    // .delete(deleteReaction);

module.exports = router;
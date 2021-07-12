// Require Express Router
const router = require('express').Router();

//Implement Controller Methods
// ============================================
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
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


// Set up GET one, PUT, and DELETE at /api/thoughts/:id
// ============================================
router
    // /api/thoughts/:id
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);


// Add/Delete Reaction
// ============================================
router
    // /api/thoughts/:thoughtId/reactions
    .route('/:thoughtId/reactions')
    .post(addReaction)
    .delete(deleteReaction);

module.exports = router;
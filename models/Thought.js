// Import Dependencies
// ============================
const { Schema, model } = require('mongoose');

// Thought Schema
// ============================
const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: [true, 'Text is required'],
        trim: true,
        minlength: 1,
        maxLength: 280
    },

    createdAt: {
        type: Date,
        default: Date.now,
        //Use a getter method to format the timestamp on query
        get: createdAtVal => dateFormat(createdAtVal)
    },

    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true
    },

    // Array of nested documents created with the reactionSchema
    reactions: [reactionSchema]
},
    {
        // use toJSON to tell schema to use Virtuals
        toJSON: {
            virtuals: true,
            getters: true
        },
        // set id to false because this is a virtual that Mongoose returns, and we don’t need it.
        id: false
    }
);

// Virtual Property
// ==================================
// retrieves the length of the thought's reactions array field on query.
ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
}
);

// Create the Thought model using the ThoughtSchema
// =================================
const Thought = model('Thought', ThoughtSchema);

// export the Thought model
// =================================
module.exports = Thought;
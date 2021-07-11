// Import Dependencies
// =================================
const { Schema, model } = require('mongoose');

// Reaction Schema
// =================================
const ReactionSchema = new Schema(
    {
        // set custom id to avoid confusion with parent comment's _id field
        reactionId: {
            // Use Mongoose's ObjectId data type
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280,
            trim: true
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    {
        //add toJSON to add getters
        toJSON: {
            getters: true
        }
    }
);

// Thought Schema Model
// =================================
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
    reactions: [ReactionSchema]
},
    {
        // use toJSON to tell schema to use Virtuals and getters
        toJSON: {
            virtuals: true,
            getters: true
        },
        // set id to false because this is a virtual that Mongoose returns, and we don’t need it.
        id: false
    }
);

// Virtual Property
// =======================================
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
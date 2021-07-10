// Import Dependencies
// ============================
const { Schema, model } = require('mongoose');

// User Schema
// ============================
const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email Address is required'],
        unique: true,
        match: [/.+@.+\..+/]
    },
    //association to the Thoughts model
    // Array of _id values
    thoughts: [
        {
            //expect an ObjectId and that its data comes from the Thought model.
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            //expect an ObjectId and that its data comes from it's own model.
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
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
// retrieves the length of the user's friends array field on query.
UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
}
);


// Create the User model using the UserSchema
// =================================
const User = model('User', UserSchema);

// export the User model
// =================================
module.exports = User;
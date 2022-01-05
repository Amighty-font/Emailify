const mongoose = require('mongoose');
const Schema = mongoose.Schema;  // equivalent to const Schema = mongoose.schema


const userSchema = new Schema({
    googleId: String
});

mongoose.model('users', userSchema);
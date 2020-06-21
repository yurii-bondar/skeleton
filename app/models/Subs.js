const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const subsSchema = new Schema({
    subscriber: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    profile: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('subs', subsSchema);
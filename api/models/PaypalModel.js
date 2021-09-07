const mongoose = require('mongoose');

const paypalSchema = mongoose.Schema({
    user: {
        type: Array,
        default: []
    },
    data: {
        type: Array,
        default: []
    },
    product: {
        type: Array,
        default: []
    }


}, { timestamps: true })


module.exports = mongoose.model('Payment', paypalSchema);


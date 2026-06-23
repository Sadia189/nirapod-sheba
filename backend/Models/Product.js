const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: String,
    location: String,
    price: Number,

    // 🔥 NEW FIELDS
    experience: String,
    phone: String,
    bio: String,
    image: String,

    // 🔐 who created this
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
});

module.exports = mongoose.model('products', ProductSchema);
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let blog = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    comments: {
        type: Array,
        required: false
    },
}, { collection: "blogs" });

module.exports = mongoose.model("blog", blog);
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    user: String,
    text: String,
    candleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Candle"
    }

});

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;
const mongoose = require("mongoose");

const candleSchema = new mongoose.Schema({
    title: String,
    description: String,
    image_link: String,
    scent: String,
    origin: String,
    brand: String
})

const Candle = mongoose.model("candle", candleSchema);
module.exports = Candle;
const Candle = require('../models/candle');
const Comment = require('../models/comment')


const candleSeeds = [
    {
        title: "a",
        description: "a",
        image_link: "https://images.unsplash.com/photo-1559091156-b9610fb12eda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
        scent: "a",
        origin: "a",
        brand: "a"
    },

    {
        title: "b",
        description: "b",
        image_link: "https://images.unsplash.com/photo-1559091156-b9610fb12eda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
        scent: "b",
        origin: "b",
        brand: "b"
    },

    {
        title: "c",
        description: "c",
        image_link: "https://images.unsplash.com/photo-1559091156-b9610fb12eda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
        scent: "c",
        origin: "c",
        brand: "c"
    }
    


]
    

const seed = async () => {
    await Candle.deleteMany();
    console.log("done deleting candles");

    await Comment.deleteMany();
    console.log("done deleting comments");

    for (const candleSeed of candleSeeds) {
        let candle = await Candle.create(candleSeed);
        await Comment.create({
            text: "hi",
            user: "user",
            candleId: candle._id
        })
        console.log(candle.title);
    }
}

module.exports = seed;
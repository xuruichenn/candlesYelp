const express = require('express');
const router = express.Router();
const Candle = require('../models/candle');
const Comment = require('../models/comment');


//Index
router.get("/", async (req, res) => {
    try {
        const candlesDB = await Candle.find().exec() //get a promise
        res.render("candles", {candlesDB}); 
        console.log(candlesDB);
    } catch (err) {
        console.log("err");
    }
    
    //res.render("candles", {test: "test", candlesDB});
})

//Create
router.post("/", async (req, res) => {
    scentLowered = req.body.scent.toLowerCase();
    originLowered = req.body.origin.toLowerCase();
    brandLowered = req.body.brand.toLowerCase();
    const newCandle = {
        title: req.body.title,
        description: req.body.description,
        scent: scentLowered,
        image_link: req.body.image,
        origin: originLowered,
        brand: brandLowered,
    }

    try {
        const newcandle = await Candle.create(newCandle);
        console.log(newcandle);
        res.redirect("/candles/" + newcandle._id);
    } catch (err) {
        console.log(err);
    }
    
})

//New
router.get("/new", (req, res) => {
    res.render("candles_new");
})

//Show one candle
router.get("/:id", async (req, res) => {
    try {
        console.log("received id", req);
        
        const candle = await Candle.findById(req.params.id).exec();
        const foundComments = await Comment.find({candleId: req.params.id});
        res.render("candles_show", {candle, foundComments});
    } catch(err) {
        console.log(err);
    }
    
     
})

//Edit candle
router.get("/:id/edit", async (req, res) => {
    try {
        const candle = await Candle.findById(req.params.id).exec();
        res.render("candle_edit", {candle});
    } catch (err) {
        console.log(err);
    }
})

//Update
router.put("/:id", async (req, res) => {
    scentLowered = req.body.scent.toLowerCase();
    originLowered = req.body.origin.toLowerCase();
    brandLowered = req.body.brand.toLowerCase();
    const updatedCandleBody = {
        title: req.body.title,
        description: req.body.description,
        scent: scentLowered,
        image_link: req.body.image,
        origin: originLowered,
        brand: brandLowered,
    }
    try {
        const updatedCandle = await Candle.findByIdAndUpdate(req.params.id, updatedCandleBody, {new: true}).exec();
        res.redirect(`/candles/${req.params.id}`);
    } catch(err) {
        console.log(err);
    }
    

})

//Delete
router.delete("/:id", async (req, res) => {
    try {
        const deletedCandle = await Candle.findByIdAndDelete(req.params.id).exec();
        console.log(deletedCandle);
        res.redirect("/candles");
    } catch (err) {
        console.log(err);
    }
    

    
})

module.exports = router;
const express = require('express');
const router = express.Router({mergeParams:true});
const Candle = require('../models/candle');
const Comment = require('../models/comment');

router.get("/new", (req, res) => {
    res.render("comments_new", {candleId: req.params.id});
})

router.post("/", (req, res) => {
    
    Comment.create({
        user: req.body.user,
        text: req.body.text,
        candleId: req.body.candleId
    })
    .then((newComment) => {
        console.log(newComment);
        
        res.redirect(`/candles/${req.body.candleId}`);
    })
    .catch((err) => {
        console.log(err);
        res.redirect(`/candles/${req.body.candleId}`);
    })
})

module.exports = router;
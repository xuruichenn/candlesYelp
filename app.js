//====================
//IMPORTS
//====================

//npm imports
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
var morgan = require('morgan');

//config imports
const config = require('./config');

//model imports
const Candle = require('./models/candle');
const Comment = require('./models/comment');

//route imports
const candleRoutes = require('./routes/candles');
const commentRoutes = require('./routes/comments');
const mainRoutes = require('./routes/main');



//====================
//DEVELOPMENT
//====================

app.use(morgan('tiny'));

//Seed the DB
const seed = require('./utils/seed');
seed();



//====================
//CONFIG
//====================
//connect to DB
mongoose.connect(config.db.connection, {useNewUrlParser: true, useUnifiedTopology: true});

//Express config
app.set("view engine", "ejs");
app.use(express.static('public'));
//Body parser config
app.use(bodyParser.urlencoded({extended: true}));
//Method override config
app.use(methodOverride('_method'));


//routes config
app.use("/candles", candleRoutes);
app.use("/candles/:id/comments", commentRoutes);
app.use(mainRoutes);

//====================
//LISTEN
//====================
app.listen(3000, () => {
    console.log("candleYelp is running");
})
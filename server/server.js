const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV);

//models import
const User = require('./models/user');
const Book = require('./models/book')
//models import end

//setting up
//db
mongoose.Promise = global.Promise;
mongoose
    .connect(config.DATABASE_URI, {useNewUrlParser: true, useCreateIndex: true})
    .then(() => console.log('db connected'))
    .catch(e => console.log(e.stack));
//express
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
//setting up end


//routes

//routes end


//port setting

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

//port setting end

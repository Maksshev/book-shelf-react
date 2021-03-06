const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV);

//routes import
const bookRoutes = require('./routes/BookRoutes');
const userRoutes = require('./routes/UserRoutes');

//models import
const User = require('./models/user');
//models import end

//db
mongoose.Promise = global.Promise;
mongoose
    .connect(config.DATABASE_URI, {useNewUrlParser: true, useCreateIndex: true})
    .then(() => console.log('db connected'))
    .catch(e => console.log(e.stack));
//express
const app = express();
//middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('client/build'));




app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);


if (process.env.NODE_ENV === 'production') {
    const path = require('path');
    app.get('/*', (req, res) => {
        res.sendfile(path.resolve(__dirname, '../client', 'build', 'index.html'))
    })
}


const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


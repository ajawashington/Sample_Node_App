const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    'mongodb+srv://ayejah:9jc5jTOsJgMr1ssn@initial-cluster.qzync.mongodb.net/shop?retryWrites=true&w=majority',
    {useNewUrlParser: true, useUnifiedTopology: true}

    ).then(result => {
      app.listen(3000);
      console.log('Connected')
    })
  .catch(err => {
    console.log(err)
  });

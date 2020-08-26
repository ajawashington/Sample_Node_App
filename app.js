const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('5f46b0d463082b576478f03a')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);


mongoose
  .connect(
    'mongodb+srv://ayejah:9jc5jTOsJgMr1ssn@initial-cluster.qzync.mongodb.net/shop?retryWrites=true&w=majority',
    {useNewUrlParser: true, useUnifiedTopology: true}

    ).then(result => {
      User.findOne().then(user => {
        if (!user) {
          const user = new User({
            name: 'Aja',
            email: 'aja@aja.com',
            cart: {
              items: []
            }
          });
          user.save();
        }
      });
      app.listen(3000);
      console.log('Connected')
    })
    .catch(err => {
      console.log(err);
    });
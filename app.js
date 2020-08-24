//server connection 
const express = require('express');
//app connection
const app = express();


//directory paths 
const path = require('path');
app.use(express.static("public"));

//template engines
app.set('view engine', 'pug');
app.set('views', 'views');

//middleware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

const error = require('./controllers/error')
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use('/admin', adminData);
app.use(shopRoutes);

app.use(error.get404)

//server port 
app.listen(3000);
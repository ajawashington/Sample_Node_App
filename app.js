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


const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404' , {pageTitle: 'Page Not Found'});
})

//server port 
app.listen(3000);
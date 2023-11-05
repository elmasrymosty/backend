const express = require('express');
const app = express();

const morgan = require('morgan');
const mongoose = require('mongoose');

mongoose.set("strictQuery", false);
const cors = require('cors');
require('dotenv/config');
//const authJwt = require('./helpers/jwt');

const errorHandler = require('./helpers/error-handler');


app.use(cors());
app.options('*', cors());

//middleware
app.use(express.json());
app.use(morgan('tiny'));
//app.use(authJwt());
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use(errorHandler);




//Routes
const categoriesRoutes = require('./routers/categories');
const productsRoutes = require('./routers/products');
const usersRoutes = require('./routers/users');
const ordersRoutes = require('./routers/orders');
const bannerRoutes = require('./routers/Banner');
const orderschargeRoutes = require('./routers/ordercharge');
const api = process.env.API_URL;


app.use(`/api/v1/categories`,categoriesRoutes,);
app.use(`/api/v1/products`, productsRoutes);
app.use(`/api/v1/users`, usersRoutes);
app.use(`/api/v1/orders`, ordersRoutes);
app.use(`/api/v1/banners`, bannerRoutes);
app.use(`/api/v1/ordercharge`, orderschargeRoutes);


app.get('/', (req, res) => {
    res.send('Welcome to your API'); // You can customize the response message
  });
  
  
//Database
  mongoose.connect(process.env.DB_URL, {
   useNewUrlParser:true,
   useUnifiedTopology: true,
   dbName: process.env.DB_NAME
})
.then(()=>{
    console.log('we are using ' + process.env.DB_NAME);
    console.log('Database Connection is ready...')
})
.catch((err)=> {
    console.log(err);
})



//Server
const port=process.env.PORT ||3000
app.listen(port, ()=>{

    console.log("Express is running on port "+process.env.PORT);
})

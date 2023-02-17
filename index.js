
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');



// Routes
const userRoutes = require('./src/routes/userRoutes.js');
const authRoutes = require('./src/routes/authRoutes');
const {dbConnection} = require('./src/db/config');



const app = express();


const PORT = process.env.PORT || 3001;

app.use(helmet());

app.use(bodyParser.json());

app.use(cors());


app.get('/ruta', (req, res) => {
    res.send('Hello World!');
});

app.use(userRoutes.routeName, userRoutes);
app.use(authRoutes.routeName, authRoutes);



app.listen(PORT, () => {

    try {

        dbConnection();
    } catch (error) {
        console.log(error);

    }
    console.log(`Listen in port: ${PORT}`);
  });


const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // ✅ ADD THIS
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');

require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 8080;

app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 

app.get('/ping', (req, res) => {
    res.send('PONG');
});

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})
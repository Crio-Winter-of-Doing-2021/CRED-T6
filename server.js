const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(express.json({extended : false}));

app.get('/', (req,res)=>res.send('API Running'));

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));
app.use('/auth', require('./routes/auth'));
app.use('/rewards', require('./routes/rewards'));
app.use('/transactions', require('./routes/transactions'));
app.use('/coupons', require('./routes/coupons'));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
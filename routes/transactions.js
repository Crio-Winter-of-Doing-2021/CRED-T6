const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
//const Card = require('../models/Card');
const auth = require('../middleware/auth');

router.get('/:card',auth,async(req,res)=>{
    const {card} = req.params.card;
    try{
        const transactions = await Transaction.find({card});
        if(!transactions)
        return [];
        res.json(transactions);
    }
    catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }
})

router.post('/pay',auth,
async (req,res) => 
{
    const {card, amount,vendor,type,category} = req.body;
    try{
        transaction = new Transaction({
         card,amount,vendor,category,type   
        });
        await transaction.save();
        res.send('Transaction Successful');
    }
    catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }

});


router.post('/',
async (req,res) => 
{
    const {card, amount,vendor,type,category} = req.body;
    try{
        transaction = new Transaction({
         card,amount,vendor,category,type   
        });
        await transaction.save();
        res.send('Transaction Successful');
    }
    catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }

});

module.exports = router;
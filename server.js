const express = require('express');
const app = express();

app.get('/', (req, res)=>{
    res.send('ha bhaiii')
})

app.listen(3002, ()=>{
    console.log('3002 pr chal gya bhaii')
})
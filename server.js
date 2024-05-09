const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Product = require('./models/productModel')

app.use(express.json());

app.get('/', (req, res)=>{
    res.send('home page')
});

app.get('/products', async (req,res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/products/:id', async (req, res) => {
    try {
        const {id} = req.params
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/products', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
});

app.put('/products/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message: `product not found with this id - ${id}`})
        }
        const updateProduct = await Product.findById(id);
        res.status(200).json(updateProduct);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

app.delete('/products/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `product not found with this id - ${id}`})
        }
        res.status(200).json(product);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

mongoose.connect('mongodb+srv://harshish3498:harshish3498@crudapi.hznpake.mongodb.net/CRUDAPI?retryWrites=true&w=majority&appName=CRUDAPI')
.then(()=>{
    console.log('connected with mongo')
    app.listen(3002, ()=>{
        console.log('app running on port 3002')
    })
})
.catch(()=>{
    console.log('not connected with mongo')
})
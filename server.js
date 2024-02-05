const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const app = express()
app.use(express.json())

//routes

app.get('/',(req,res)=>{
    res.send('Hello Node API')
})
app.get('/blog',(req,res)=>{
    res.send('Hello blog')
})

//display all products
app.get('/products',async(req,res)=>{
    try{
        const products=await Product.find({});
        res.status(200).json(products);
    } catch(error){
        console.log(error.message);
        res.status(500).json({message:error.message})
    }
})

//display a particular product
app.get('/products/:id',async(req,res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    }catch(error){
        res.status(500).json({message:error.message})
    }
})

// add a product
app.post('/products',async(req,res)=>{
    try{
        const product=await Product.create(req.body)
        res.status(200).json(product);
    } catch(error){
        console.log(error.message);
        res.status(500).json({message:error.message})
    }
})

//update a product
app.put('/products/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        const product = await Product.findByIdAndUpdate(id,req.body);
        if(!product){
            return res.status(404).json({message:`cannot find any product with ID ${id}`});
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    }catch(error){
        res.status(500).json({message:error.message})
    }
})

//delete a product

app.delete('/products/:id',async(req,res)=>{
    try{
        const {id}=req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message:`cannot find any product with ID ${id}`});
        }
        res.status(200).json();
    }catch(error){
        res.status(500).json({message:error.message})
    }
})

mongoose.connect('mongodb+srv://ayshnoah:Gc6epNwa84%40n.zY@ayushapi.eroisxx.mongodb.net/NODE-API?retryWrites=true&w=majority')
.then(()=>{
    console.log('connected to MongoDB')
    app.listen(3000,()=>{
        console.log('node api is running on port 3000')
    })
}).catch((error) => {
    console.error('An error occurred:', error.stack);
});
const { Router } = require("express");
const path = require("path");
const fs = require('fs');
const Product = require('../models//productsModels.js');

require('dotenv').config();


const productRouter  = Router();
const password = process.env.PASSWORD;


const getProducts = () => {
    const filePath = path.join(__dirname, "../products.json");

    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '[]', 'utf-8');
    }

    return JSON.parse(fs.readFileSync(filePath, 'utf-8', (err, data) => {
        console.log({err,data});
    }));
};

productRouter.get("/products", (req, res) =>{
    const products = getProducts();
    res.json(products);
});

productRouter.get("/products/:id", (req, res) =>{
    const products = getProducts();
    const product = products.find(pr => pr.id === req.params.id);
    if(!product){
        return res.send("Product not found");
    }
    res.json(product);
});

const saveProducts = (products) => {
    return fs.writeFileSync(path.join(__dirname, "../products.json"), JSON.stringify(products, null, 2));
};

productRouter.post("/products", (req, res) =>{
    if (req.headers.password !== password) {
        return res.send('Forbidden' );
    }
    const products = getProducts();
    const newProduct = new Product(
        `${products.length + 1}`,
        req.body.name,
        req.body.description,
        req.body.price,
        req.body.stock
    );
    products.push(newProduct);
    saveProducts(products);
    res.json(newProduct);
});

productRouter.put("/products/:id", (req, res) =>{
    if (req.headers.password !== password) {
        return res.send('Forbidden' );
    }
    const products = getProducts();
    const index = products.findIndex(pr => pr.id === req.params.id);
    // console.log(index);
    if(index === -1) {
        return res.send('Product not found');
    }
    products[index] = { ...products[index], ...req.body };
    saveProducts(products);
    res.json(products[index]);

});

productRouter.delete("/products/:id", (req, res) => {
    if (req.headers.password !== password) {
        return res.send('Forbidden' );
    }
    const products = getProducts();
    const index = products.findIndex(pr => pr.id === req.params.id);
    if(index === -1) {
        return res.send('Product not found');
    }
    products.splice(index, 1);
    saveProducts(products);
    // res.status(204).send();
    res.json(products);
});

module.exports = productRouter;
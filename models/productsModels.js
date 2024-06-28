// const { Models } = require("express");

// const productsModels  = Models();


class Product {
    constructor(id, name, description, price, stock) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
    }
}

module.exports = Product;
// export default Product;
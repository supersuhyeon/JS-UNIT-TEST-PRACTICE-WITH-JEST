const ProductClient = require('./ProductClient')

class ProductService {
    constructor(){
        this.ProductClient = new ProductClient()
    }

    fetchAvailableItems(){
        return this.ProductClient
        .fetchItems()
        .then((items)=>{return items.filter((item)=>{return item.available})})
    }
}

module.exports = ProductService
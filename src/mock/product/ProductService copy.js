class ProductService {
    constructor(ProductClient){
        this.ProductClient = ProductClient
    }

    fetchAvailableItems(){
        return this.ProductClient
        .fetchItems()
        .then((items)=>{return items.filter((item)=>{return item.available})})
    }
}

module.exports = ProductService
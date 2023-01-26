const ProductService = require('../ProductService copy')
const StubProductClient = require('./StubProductClient')

describe('ProductService - Stub', ()=>{
    let productService

    beforeEach(()=>{
        productService = new ProductService(new StubProductClient())
    })


    it('should filter out only available items', async()=>{
        const items = await productService.fetchAvailableItems()
        expect(items.length).toBe(1)
        expect(items).toEqual([{item: 'milk', available:true}])
    })
})
const ProductService = require('../ProductService')
const ProductClient = require('../ProductClient')

jest.mock('../ProductClient')


describe('productService', ()=>{
    const fetchItems = jest.fn(async()=> [
        {item: 'milk', available:true},
        {item: 'egg',  available:false},
    ])

    ProductClient.mockImplementation(()=>{
        return {
            fetchItems: fetchItems,
        }
    })

    let productService;

    beforeEach(()=>{
        productService = new ProductService();
    })

    it('should filter out only available items', async()=>{
        const items = await productService.fetchAvailableItems()
        expect(items.length).toBe(1)
        expect(items).toEqual([{item: 'milk', available:true}])
    })

    it('test', async()=>{
        const items = await productService.fetchAvailableItems()
        expect(fetchItems).toHaveBeenCalledTimes(1)
    })
})
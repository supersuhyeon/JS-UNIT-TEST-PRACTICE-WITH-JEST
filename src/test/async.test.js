const fetchProduct = require('../async.js')

describe('async' , ()=>{
    it('async-done', (done)=>{
        fetchProduct().then((item) => {
            expect(item).toEqual({item: 'Milk', price : 200})
            done()
        })
    })

    it('async-return', ()=>{
       return fetchProduct().then((item) => {
            expect(item).toEqual({item: 'Milk', price : 200})
        })
    })

    it('async-await', async ()=>{
        const data = await fetchProduct();
        expect(data).toEqual({item: 'Milk', price : 200})
       
     })

     it('async-resolves', async ()=>{
       return expect(fetchProduct()).resolves.toEqual({item: 'Milk', price : 200})
       
     })

     it('async-reject', async ()=>{
        return expect(fetchProduct('error')).rejects.toBe('network error')
        
      })
})


// test('test async', ()=>{
//     return fetchProduct('hello').then((product)=>{
//         expect(product).toEqual({item: 'Milk', price : 200})
//     })
// })


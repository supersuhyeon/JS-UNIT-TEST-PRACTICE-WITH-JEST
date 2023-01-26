class ProductClient{
    fetchItems(){
        return fetch('http://example.com/login/id+password').then((response)=>{
            return response.json()
        })
    }
}

module.exports = ProductClient
class StubProductClient {
    async fetchItems(){
        return [
            {item: 'milk', available:true},
            {item: 'egg',  available:false},
        ]
    }
}

module.exports = StubProductClient
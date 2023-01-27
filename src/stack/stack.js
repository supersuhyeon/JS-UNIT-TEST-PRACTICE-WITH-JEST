class Stack{

    constructor(){
        // this.array = []

        this._size = 0;
        this.head = null
    }

    size(){
        // return this.array.length

        return this._size;
    }

    push(item){
        // this.array.push(item)
        const node = {item:item, next:this.head}
        this.head = node
        this._size++;
    }
    pop(){
        // if(this.array.length === 0){
        //     throw new Error('stack is empty')
        // }
        // return this.array.pop()

        // if(this.head === null){
        //     throw new Error('stack is empty')
        // }
        const node2 = this.head
        this.head = node2.next
        this._size--;
        return node2.item
    }
    peek(){
        // if(this.array.length === 0){
        //     throw new Error('stack is really empty')
        // }

        // return this.array[this.size()-1]

        if(this.head === null){
            throw new Error('stack is really empty')
        }
        return this.head.item
    }


}

module.exports = Stack
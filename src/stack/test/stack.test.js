const Stack = require('../stack')

describe('stack', ()=>{
    let stack;

    beforeEach(()=>{
        stack = new Stack;
    })

    it('is created empty',()=>{
        expect(stack.size()).toBe(0)
    })

    it('allows to push', ()=>{
        stack.push('apple')
        expect(stack.size()).toBe(1)
    })

    describe('pop',()=>{

        // it('throws an error if stack is empty', ()=>{
        //     expect(()=>{stack.pop()}).toThrow('stack is empty')
        // })

        it('returns the last pushed item and removes it from the stack', ()=>{
            stack.push('banana')
            stack.push('orange')
            expect(stack.pop()).toBe('orange')
             expect(stack.pop()).toBe('banana')
            expect(stack.size()).toBe(0)
        })
    })

    // describe('peek', ()=>{
    //     it('throws an error if stack is empty', ()=>{
    //         expect(()=>{stack.peek()}).toThrow('stack is really empty')
    //     })

    //     it('returns the last pushed item but keeps it in the stack', ()=>{
    //         stack.push('banana')
    //         stack.push('orange')
    //         expect(stack.peek()).toBe('orange')
    //         expect(stack.size()).toBe(2)
    //     })
    // })


})
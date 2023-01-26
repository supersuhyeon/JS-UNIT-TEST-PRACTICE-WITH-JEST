const Calculator = require('../calculator.js');

describe('Calculator', ()=>{
    let cal;
    beforeEach(()=>{
        cal = new Calculator()
    })

    it('init with 0', ()=>{
        expect(cal.value).toBe(0)
    })

    it('set', ()=>{
        cal.set(9)
        expect(cal.value).toBe(9)
    })

    it('add', ()=>{
        cal.set(5)
        cal.add(3)
        expect(cal.value).toBe(8)
    })

    it('add should throw an error if value is greater than 100', ()=>{
        expect(()=>{
            cal.add(101)
        }).toThrowError('hey numbers can not be over 100')
    })

    it('multiply', ()=>{
        cal.set(9)
        cal.multiply(10)
        expect(cal.value).toBe(90)
    })

    describe('divides', ()=>{
        it('0/0 === NaN', ()=>{
            cal.divide(0)
            expect(cal.value).toBe(NaN)
        })

        it('4/4 === 1', ()=>{
            cal.set(4)
            cal.divide(4)
            expect(cal.value).toBe(1)
        })
    })
})
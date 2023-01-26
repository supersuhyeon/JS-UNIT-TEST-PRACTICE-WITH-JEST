const check = require('../check')

describe('check', ()=>{
    let onSuccess;
    let onFail;

    beforeEach(()=>{
        onSuccess = jest.fn()
        onFail = jest.fn()
    })

    it('should call onSucess when predicate is true', ()=>{
        check(()=>true, onSuccess, onFail)

        expect(onSuccess).toHaveBeenCalledTimes(1)
        expect(onSuccess.mock.calls.length).toBe(1)
        expect(onSuccess).toHaveBeenCalledWith('yes')
        expect(onSuccess.mock.calls[0][0]).toBe('yes')
        expect(onFail.mock.calls.length).toBe(0)
    })

    it('should call onFail when predicate is false', ()=>{
        check(()=>false, onSuccess, onFail)

        expect(onFail).toHaveBeenCalledTimes(1)
        expect(onFail).toHaveBeenCalledWith('no')
        expect(onSuccess).toHaveBeenCalledTimes(0)
    })
})
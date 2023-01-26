function check(predicate, onSuccess, onFail){
    if(predicate()){
        onSuccess('yes')
    }else if(predicate()){
        onFail('no')
    }else{
        onFail('no')
    }
}

module.exports = check
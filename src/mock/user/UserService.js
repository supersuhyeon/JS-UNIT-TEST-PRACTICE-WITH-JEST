class UserService{
    constructor(userClient){
        this.userClient = userClient;
        this.isLogedin = false
    }

    login(id, password){
        if(!this.isLogedin){
            return this.userClient
            .login(id, password)
            .then((data)=>{return this.isLogedin = true})
        }
    }
}

module.exports = UserService
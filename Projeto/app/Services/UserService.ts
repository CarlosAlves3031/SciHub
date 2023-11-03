import User from 'App/Models/User'

export default class UsersController {
    constructor() { }

    public async create(email: string, password: string,nome:string,username:string) {
        const user = await User.create({
            password,
            email,nome,username
        })

        return user
    }
}
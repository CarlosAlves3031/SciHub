import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserService from 'App/Services/UserService'
import CreateUserValidator from 'App/Validators/CreateUserValidator'

export default class UsersController {
  public async create({ view }: HttpContextContract) {
    return view.render('users/create')
  }

  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(CreateUserValidator)
    const email = data.email
    const password = data.password
    const nome = data.name
    const username = data.username

    if (!email || !password|| !nome) {
      response.status(400)
      return response
    }

    const userService = new UserService()
    const user = await userService.create(email, password, nome,username)

    return response.redirect().toRoute('posts.index', { id: user.id })
  }

  public async show({ params, view }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    return view.render('users/show', { user: user })
  }

  public async update({ params, view, auth }: HttpContextContract) {
    await auth.use('web').authenticate()
    const user = await User.findOrFail(params.id)

    return view.render('users/update', { user: user })
  }

  public async patch({ params, request, response }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    const email = request.input('email', undefined)
    const username = request.input('username', undefined)
    const nome = request.input('nome', undefined)
    const password = request.input('password', undefined)

    user.email = email ? email : user.email
    user.username = username ? username : user.username
    user.nome = nome ? nome : user.nome
    user.password = password ? password : user.password

    await user.save()

    return response.redirect().toRoute('users.update', { id: user.id })
  }

  public async index({ view }: HttpContextContract) {
    const users = await User.all()

    return view.render('users/index', { users: users })
  }
 
  public async destroy({ auth, response }: HttpContextContract) {
    await auth.use('web').authenticate();
    const user = auth.user;
    if (!user) {
      throw new Error('Usuário não autenticado');
    }
    await user.delete();
   
    await auth.use('web').logout();
    return response.redirect().toRoute('session.create');
  }
  

}
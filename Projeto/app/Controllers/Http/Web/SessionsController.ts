//import { Response } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SessionsController {
  public async create({ view}: HttpContextContract) {
    return view.render('sessions/create')

  }

    public async store({ view,auth,request,response}: HttpContextContract) {
      const email = request.input('email')
      const password = request.input('password')
      

      //autenticação atraves do email e password
      try{
      await auth.use('web').attempt(email, password) 
      response.redirect().toRoute('posts.create')      //ver aonde vai redirecionar
      }

      catch{
        return response.badRequest('Invalid')
      }
      return view.render('sessions/create') 
    }

    public async delete({ auth, response}: HttpContextContract) {
      await auth.use( 'web').logout()
      return response.redirect().toRoute('users')
  
    }

  }

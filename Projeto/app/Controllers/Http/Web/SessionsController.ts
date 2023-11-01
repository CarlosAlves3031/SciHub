import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SessionsController {
    public async create({ view}: HttpContextContract) {
    
        return view.render('session/create')
      }
}



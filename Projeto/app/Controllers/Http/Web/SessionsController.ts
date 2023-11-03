import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateSessionValidator from 'App/Validators/CreateSessionValidator'

export default class SessionsController {
    public async create({ view }: HttpContextContract) {
        return view.render('sessions/create')
      }

    public async store({ request, response,auth,session }: HttpContextContract) {
        const data = await request.validate(CreateSessionValidator)

        try {
            await auth.use('web').attempt(data.email,data.password)
        } catch (error) {
            session.flash({
                "email": data.email,
                "errors": {
                  "password": [
                    'Senha incorreta'
                  ]
                }
            })
            return response.redirect().toRoute('session.create')
        }
        return response.redirect().toRoute('posts.index')

    }

    public async delete({ response,auth }: HttpContextContract) {
        await auth.use('web').logout()
        return response.redirect().toRoute('session.create')
    }

    

}

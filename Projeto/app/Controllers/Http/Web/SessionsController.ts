import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SessionsController {
    public async create({ view }: HttpContextContract) {
        return view.render('sessions/create')
      }

    public async store({ request, response,auth }: HttpContextContract) {
        const email = request.input('email')
        const password = request.input('password')

        try {
            await auth.use('web').attempt(email, password)
            return response.redirect().toRoute('posts.index')
        } catch (error) {
            return response.badRequest(error.message)
        }
    }

    public async delete({ response,auth }: HttpContextContract) {
        await auth.use('web').logout()
        return response.redirect().toRoute('session.create')
    }

    

}

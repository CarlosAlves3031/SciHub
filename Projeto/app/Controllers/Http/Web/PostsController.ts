import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Post from 'App/Models/Post'
import PostService from 'App/Services/PostService'
import CreatePostValidator from 'App/Validators/CreatePostValidator'
import { format } from 'date-fns'
import { DateTime } from 'luxon'


export default class PostsController {
  public async create({ view,auth }: HttpContextContract) {
    await auth.use('web').authenticate()
    return view.render('posts/create')
  }

  public async store({ request, response, auth }: HttpContextContract) {
    await auth.use('web').authenticate()
    const payload = await request.validate(CreatePostValidator)
  
    // Pegar o usuário logado
    const user = auth.user!
  
    const postService = new PostService()
    const post = await postService.create(user, payload)
  
    return response.redirect().toRoute('posts.index', { id: post.id })
  }
  

  public async show({ params, view,auth }: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    await auth.use('web').authenticate()
    await post.load('user')

    return view.render('posts/show', { post: post })
  }

  public async update({request,response,params}: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    const payload = await request.validate(CreatePostValidator)
    post.merge(payload)
    await post.save()
    return response.redirect().toRoute('posts.index', { id: post.id })
  }

  public async patch({}: HttpContextContract) {}

  public async index({ view, auth }: HttpContextContract) {
    await auth.use('web').authenticate()
    const posts = await Post.query().preload('user')

    // Formatando o campo `createdAt` de cada post
    const formattedPosts = posts.map((post) => {
      return {
        ...post.toJSON(),
        formattedCreatedAt: format(new Date(post.createdAt), 'dd/MM/yyyy HH:mm'),
      }
    })

    const email = auth.user?.email // Acesse o email do usuário autenticado
    const username = auth.user?.username // Acesse o nome de usuário do usuário autenticado

    return view.render('posts/index', { posts: formattedPosts, email, username })
  }
}






  
  
  
  
  
  
  
  

  

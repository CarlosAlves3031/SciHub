import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Comment from 'App/Models/Comment'
import Moment from 'App/Models/Post'

export default class CommentsController {
  
  public async store({ request, response, params }: HttpContextContract) {
    const body = request.body()
    const postId = params.postId

    await Moment.findOrFail(postId)

    body.postId = postId

    const comment = await Comment.create(body)

    response.status(201)

    return {
      message: 'Comentário adicionado com sucesso!',
      data: comment,
    }
  }
  public async index({ params }: HttpContextContract) {
    const postId = params.postId

    const comments = await Comment.query().where('post_id', postId)

    return comments
    //view.render('comments/index', { comments: comments })
  }
}
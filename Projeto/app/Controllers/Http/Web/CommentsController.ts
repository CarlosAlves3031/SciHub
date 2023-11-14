import { HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
import CreateCommentValidator from 'App/Validators/CreateCommentValidator'
import CommentService from 'App/Services/CommentService'
import Post from 'App/Models/Post'
import Comment from 'App/Models/Comment'


export default class CommentsController {
  public async store({ request, response, auth,params}: HttpContextContract) {
    await auth.use('web').authenticate()
    const data = await request.validate(CreateCommentValidator)
    
  
    // Get the logged-in user
    const user = auth.user!
    // Get the post
    const post = await Post.findOrFail(params.id)
    
    const commentService = new CommentService()
    const comment = await commentService.create(user,post, data)
  
    await comment.save()
    return response.redirect().toRoute('posts.index', { id: post.id })
  }
  public async index({ params }: HttpContextContract) {
    const postId = params.postId

    const comments = await Comment.query().where('post_id', postId)

    return comments
    //view.render('comments/index', { comments: comments })
  }

}

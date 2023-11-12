import User from 'App/Models/User'
import Post from 'App/Models/Post'
import Comment from 'App/Models/Comment'
export default class UsersController {
  constructor() {}

  public async create(user: User,post: Post, data: {
    content: string
  }) {
    const comment = new Comment()
    comment.text = data.content
    comment.userId = user.id
    comment.postId = post.id

    await comment.save()

    return comment
  }
}
import User from 'App/Models/User'
import Post from 'App/Models/Post'
import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser'
export default class UsersController {
  constructor() {}

  public async create(user: User, data: {
    title: string,
    content: string
    image: MultipartFileContract | undefined;
  }) {
    const post = new Post()
    post.title = data.title
    post.description = data.content
    post.userId = user.id
    post.image = data.image!

    await post.save()

    return post
  }
}
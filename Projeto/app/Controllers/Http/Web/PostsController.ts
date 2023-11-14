import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import User from 'App/Models/User'
import PostService from 'App/Services/PostService'
import CreatePostValidator from 'App/Validators/CreatePostValidator'
import { format } from 'date-fns'
import {v4 as uuidv4} from 'uuid'   //importando uuid
import Application from '@ioc:Adonis/Core/Application'
import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser' // Add this import statement

export default class PostsController {
  public async create({ view,auth }: HttpContextContract) {
    await auth.use('web').authenticate()
    const email = auth.user?.email // Acesse o email do usuário autenticado
    const username = auth.user?.username // Acesse o nome de usuário do usuário autenticado
    
    return view.render('posts/create'{email,username})
  }

  public async store({ request, response, auth }: HttpContextContract) {
    await auth.use('web').authenticate()
    const payload = await request.validate(CreatePostValidator)
    
  
    // Get the logged-in user
    const user = auth.user!
  
    const postService = new PostService()
    const post = await postService.create(user, payload)
  
    const image = request.file('image') // Assuming you're uploading an image
    if (image) {
      const imageName = `${uuidv4()}.${image.extname}`
      await image.move(Application.tmpPath('uploads'), {
        name: imageName
      })
      post.image = imageName as unknown as MultipartFileContract // Assign the image name to the post's `image` property
      await post.save()
    }

  
    return response.redirect().toRoute('posts.index', { id: post.id })
  }
  
  public async show({ params, view, auth }: HttpContextContract) {
    // Autenticação do usuário
    await auth.use('web').authenticate();
    const email = auth.user?.email // Acesse o email do usuário autenticado
    const username = auth.user?.username // Acesse o nome de usuário do usuário autenticado

    // Encontre a postagem e carregue o usuário relacionado
    const post = await Post.findOrFail(params.id);
    await post.load('user');
    // Encontre a postagem e carregue os comentários relacionados
    await post.load('comments');

    // Mapeie os comentários para incluir o nome do usuário
    const commentsWithUsernames = await Promise.all(
        post.comments.map(async (comment) => {
            // Assuming you have the User model imported
            const user = await User.find(comment.userId);
            const username = user ? user.username : 'Unknown User';
            return {
                ...comment.toJSON(),
                username,
            };
        })
    );

    const imagePaths: string[] = [];

    // Verifique se a postagem tem uma imagem e adicione o caminho da imagem ao array
    if (post.image) {
        const imagePath = '/uploads' + '/' + post.image;
        imagePaths.push(imagePath);
    }

    // Renderiza a view com os dados da postagem, incluindo os caminhos das imagens
    return view.render('posts/show', {
        username,
        email,
        comments: commentsWithUsernames,
        post,
        imagePaths,
        formattedCreatedAt: format(new Date(post.createdAt.toJSDate()), 'dd/MM/yyyy HH:mm'),
    });
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
        formattedCreatedAt: format(post.createdAt.toJSDate(), 'dd/MM/yyyy HH:mm'),
      }
    })

    const email = auth.user?.email // Acesse o email do usuário autenticado
    const username = auth.user?.username // Acesse o nome de usuário do usuário autenticado

    return view.render('posts/index', { posts: formattedPosts, email, username })
  }

  public async destroy({} : HttpContextContract){
  }
}






  
  
  
  
  
  
  
  

  

import {v4 as uuidv4} from 'uuid'   //importando uuid
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import Application from '@ioc:Adonis/Core/Application'


export default class PostsController {
    //Inserir
    private validadeOptions = {
        types: ['image'],
        size: '2mb',
        extnames: ['jpg','png','jpeg']
    }
    public async store({request,response}: HttpContextContract){
        const body = request.body()
        const image = request.file('image',this.validadeOptions)
        if(image){
            const imageName = `${uuidv4()}.${image.extname}`
            await image.move(Application.tmpPath('uploads'),{
                name: imageName
            })
            body.image = imageName
        }

        const post = await Post.create(body)
        response.status(201).json(post)   
        
        return{
            message: 'Post criado com sucesso',
            data: post,
        }
    }
    //Buscar todos os momentos
    public async index({}: HttpContextContract){
        const posts = await Post.all()
        return posts
    }
        
    
    //Buscar momento por id
    public async show({params}: HttpContextContract){
        const post = await Post.findOrFail(params.id)
        await post.load('comments')
        return post
    }
    
    //Deletar momento
    public async destroy({params}: HttpContextContract){
        const post = await Post.findOrFail(params.id)
        await post.delete()

        return{
            message: 'Momento deletado com sucesso'
        }
    }

    //Atualizar momento 
    public async update({ params, request }: HttpContextContract) {
            const body = request.body()
    
            const post = await Post.findOrFail(params.id)
    
            post.title = body.title
            post.description = body.description
    
            if (post.image != body.image || !post.image) {
                const image = request.file('image', this.validadeOptions)

                if (image) {
                    const imageName = `${uuidv4()}.${image!.extname}`

                    await image.move(Application.tmpPath('uploads'), {
                        name: imageName,
                    })

                    const imagePath = Application.tmpPath('uploads', imageName)
                    const multipartFile = await MultipartFile.create(imagePath)

                    post.image = multipartFile
                }
            }

            await post.save()
    
            return {
                message: 'Momento atualizado com sucesso!',
                data: post,
            }
    }
}
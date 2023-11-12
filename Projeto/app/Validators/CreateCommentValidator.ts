import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateCommentValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    content: schema.string({ trim: true }, [
      rules.minLength(5),
      rules.maxLength(200),
      rules.required(),
    ]),
   })  

    public messages = {
        'content.required': 'O campo conteúdo é obrigatório',
        'content.minLength': 'O campo conteúdo deve ter no mínimo 5 caracteres',
        'content.maxLength': 'O campo conteúdo deve ter no máximo 200 caracteres',
    }
}


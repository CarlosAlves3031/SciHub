import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({}, [
      rules.trim(),
      rules.escape(),
      rules.minLength(3),
      rules.maxLength(100)
    ]),
    username: schema.string({}, [
      rules.minLength(3),
      rules.maxLength(15),
      rules.unique({table:'users', column: 'username'}),
      rules.trim()
    ]),
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.normalizeEmail({
        allLowercase: true,
      }),
      rules.unique({ table: 'users', column: 'email' }),
    ]),
    password: schema.string({}, [
      rules.minLength(3),
    ]),
  })


  public messages = {
    required: 'Preencha o campo',
    'name.minLength': 'Nome deve ter pelo menos 3 letras',
    'name.maxLength': 'Nome não pode ter mais de 100 letras',
    'username.minLength': 'Username deve ter pelo menos 3 letras',
    'username.maxLength': 'Username não pode ter mais de 15 letras',
    'username.unique': 'Username já cadastrado',
    'username.regex' : 'Apenas letras minúsculas, números e underline são permitidos',
    'password.minLength': 'Mínimo de três caracteres',
    'email.unique': 'E-mail já cadastrado',
    'email.email': 'E-mail inválido',
    'password.minLenght': 'A senha deve ter pelo menos 3 caracteres'
  }
}

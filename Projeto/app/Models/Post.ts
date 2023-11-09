import { DateTime } from 'luxon'
import { BelongsTo,belongsTo,BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Comment from './Comment'
import User from 'App/Models/User'
import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser'
export default class Post extends BaseModel {
  @hasMany(() => Comment)
  public comments: HasMany<typeof Comment>

  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public image: MultipartFileContract

  @column()
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


}
import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany, HasMany, BelongsTo} from '@ioc:Adonis/Lucid/Orm'
import Comment from './Comment'
import User from './User'
export default class Post extends BaseModel {
  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @hasMany(() => Comment)
  public comments: HasMany<typeof Comment>

  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string
  
  @column()
  public description: string

  @column()
  public image: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
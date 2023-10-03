import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo,belongsTo} from '@ioc:Adonis/Lucid/Orm'
import Post from 'App/Models/Post'

export default class Reply extends BaseModel {
  @belongsTo(() => Post)
  public post: BelongsTo<typeof Post>
  
  @column({ isPrimary: true })
  public id: number

  @column()
  public username: string

  @column()
  public text: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
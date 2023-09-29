import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'

export default class Reply extends BaseModel {
  @hasMany(() => Reply)
  public replies: HasMany<typeof Reply>

  @column({ isPrimary: true })
  public id: number

  @column()
  public username: string

  @column()
  public text: string

  @column()
  public momentId: number
   
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
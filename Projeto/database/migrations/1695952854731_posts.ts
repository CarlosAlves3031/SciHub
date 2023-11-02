
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Moments extends BaseSchema {
  protected tableName = 'posts'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title')
      table.string('description')
      table.string('image')

      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')

      table.timestamps(true,true);
      table.timestamp('create_time').nullable()
     
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
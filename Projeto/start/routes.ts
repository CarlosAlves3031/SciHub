/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
    Route.group(() => {
        Route.resource('', 'PostsController').apiOnly()
        Route.post('/:postId/comments', 'CommentsController.store')
        Route.get('/:id', 'PostsController.show') 
    }).prefix('/posts')

  Route.group(() => {
    Route.get('/', 'UsersController.index')
    Route.get('/:id', 'UsersController.show')
    Route.delete('/:id', 'UsersController.destroy')
    Route.patch('/:id', 'UsersController.update')
    Route.post('/', 'UsersController.store')
  }).prefix('/users')
})
  .prefix('/api')
  .namespace('App/Controllers/Http/Api')

Route.group(() => {
  Route.group(() => {
    Route.get('/', 'UsersController.index').as('users.index')
    Route.get('/new', 'UsersController.create').as('users.create')
    Route.post('/', 'UsersController.store').as('users.store')
    Route.get('/:id/update', 'UsersController.update').as('users.update')
    Route.patch('/:id', 'UsersController.patch').as('users.patch')
    Route.get('/:id', 'UsersController.show').as('users.show')
  }).prefix('/users')
}).namespace('App/Controllers/Http/Web')

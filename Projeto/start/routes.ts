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

// Route.group(() => {
//   Route.group(() => {
//     Route.get('/', 'PostsController.index')
//     Route.get('/id', 'PostsController.show')
//     Route.delete('/:id', 'PostsController.destroy')
//     Route.patch('/:id', 'PostsController.update')
//     Route.post('/', 'PostsController.store').as('posts.store')
//   }).prefix('/posts')

//   Route.group(() => {
//     Route.get('/', 'UsersController.index')
//     Route.get('/:id', 'UsersController.show')
//     Route.delete('/:id', 'UsersController.destroy')
//     Route.patch('/:id', 'UsersController.update')
//     Route.post('/', 'UsersController.store')
//   }).prefix('/users')
// })
//   .prefix('/api')
//   .namespace('App/Controllers/Http/Api')

Route.group(() => {
  Route.group(() => {
    Route.get('/', 'UsersController.index').as('index')
    Route.get('/new', 'UsersController.create').as('create')
    Route.post('/', 'UsersController.store').as('store')
    Route.get('/:id/update', 'UsersController.update').as('update')
    Route.post('/:id', 'UsersController.patch').as('patch')
    Route.get('/:id', 'UsersController.show').as('show')
    Route.delete('/:id', 'UsersController.destroy').as('destroy')
  })
    .prefix('/users')
    .as('users')

  Route.group(() => {
    Route.get('/', 'PostsController.index').as('index')
    Route.get('/new', 'PostsController.create').as('create')
    Route.post('/', 'PostsController.store').as('store')
    Route.get('/:id/update', 'PostsController.update').as('update')
    Route.patch('/:id', 'PostsController.patch').as('patch')
    Route.get('/:id', 'PostsController.show').as('show')
    Route.post('/:id/comments', 'CommentsController.store').as('comments.store')
    Route.get('/posts/user', 'PostsController.indexForUser').as('indexForUser');
    Route.delete('/:id', 'PostsController.destroy').as('destroy');


    
  })
    .prefix('/posts')
    .as('posts')
  
  Route.get('/', 'SessionsController.create').as('login')
  Route.get('/login', 'SessionsController.create').as('session.create')
  Route.post('/login', 'SessionsController.store').as('session.store')
  Route.get('/logout', 'SessionsController.delete').as('session.delete')
}).namespace('App/Controllers/Http/Web')


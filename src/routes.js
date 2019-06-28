const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');
const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');

const routes = new express.Router();
const upload = multer(uploadConfig);

//rota para retornar todos os posts.
routes.get('/posts', PostController.index);

//rota para interpretar o corpo da requisição do formato multpart.
routes.post('/posts', upload.single('image'), PostController.store); 

//rota para para realizar os likes.
routes.post('/posts/:id/like', LikeController.store);

//POST http://localhost:3333/posts

module.exports = routes;
/*REPONSÁVEL PELA LÓGICA DA APLICAÇÃO (PostController.js)*/
const Post = require('../models/Post'); //Schema do Post.
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
module.exports = {
    async index(req, res) { //Retorna todos os posts em ordem descrescente(-) pelo campo createAt (tabela).
        const posts = await Post.find().sort(`-createdAt`);

        return res.json(posts); //Mostra os posts.
    },

    async store(req, res) { //Recebe os dados do arquivo e os outros dados do post.
        const { author, place, description, hashtags } = req.body;
        const { filename: image } = req.file; //Recupera o nome do arquivo.

        const [name] = image.split('.'); //Separa o nome do arquivo e a extensão.

        const fileName = `${name}.jpg`; //Concatena o nome do arquivo + 'jpg'


        await sharp(req.file.path) //Redimensiona o arquivo original
            .resize(500) //500 pixel.
            .jpeg({ quality: 70 })
            .toFile(
                path.resolve(req.file.destination, 'resized', image) //Salva o arquivo redimensionado na pasta resized.
            );

        fs.unlinkSync(req.file.path); //Apaga o arquivo original da pasta uploads.

        const post = await Post.create({ //Insere o post no banco de dados.
            author,
            place,
            description,
            hashtags,
            image,
        });

        req.io.emit('post', post) ;//Emite informação para todos os usuários conectados a aplicação (FRONTEND).
        return res.json(post); //Mostra o post.
    }
};

//REPONSÁVEL PELA LÓGICA DA APLICAÇÃO (LikeController.js)

const Post = require('../models/Post');

module.exports = {
    async store(req, res) { //Update.
        const post = await Post.findById(req.params.id); //Pesquisa o post a ser atualizado.

        post.likes += 1; //Soma mais 1

        await post.save(); //Atuliza o post no banco de dados.

        req.io.emit('like', post) //Emite informação para todos os usuários conectados a aplicação.

        return res.json(post);
    }
};
/*
PONTO DE ENTRADA DA APLICAÇÃO (index.js)

https://www.mongodb.com/cloud/atlas
login: mvidoy@hotmail.com
password: omv@230888
1)Criar novo projeto
2)Criar novo cluster
mkdir backend
cd backend
yearn init -y
yarn add express
node src/index.js
No package.json criar:
"scripts": {
    "dev": "nodemon src/index.js"
 },
yarn dev
yarn add mongoose
yarn add multer
https://insomnia.rest/download/#windows
yarn add sharp
yarn add cors //Permite que o bakend seja acessível pelo frontend mesmo em domínios diferentes.
yarn add socket.io
*/

const express = require('express'); //Permite lidar com rotas, parametros das requisições.
const mongoose = require('mongoose'); //Conexão com o banco de dados MongoDB.
const path = require('path');
const cors = require('cors');

const app = express(); //Protocolo http.

const server = require('http').Server(app); //Permite o acesso do protocolo http.
const io = require('socket.io')(server); //Permite conexão via protocolos http como também websocket.

mongoose.connect('mongodb+srv://osvaldo:230888@cluster0-g171a.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
});

app.use((req, res, next) => { //Coloquei o parâmetro next, estava dando erro na conexão com o BD.
    req.io = io; //Medware para disponibilizar informações em tempo REAL para toda 
                 //a aplicação via websocket, a partir desse ponto (Interceptador)    
    
    next(); //Garante a axecusão dos demais app.
})

app.use(cors()); //Permite que o backend seja acessível pelo frontend mesmo em domínios diferentes.

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized'))); 
//rota para acessar arquivos staticos (uploads)

app.use(require('./routes')); //Arquivo separado para declarar outras rotas da aplicação.

//app.listen(3333); //Atende a aplicação na porta 3333 (protocolo http)

server.listen(3333); //Acesso ao protocolo http e websocket.
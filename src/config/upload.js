const multer = require('multer');
const path = require('path');

module.exports = {
    storage: new multer.diskStorage({
        destination: path.resolve(__dirname, '..','..', 'uploads'), //Destino quera será gravado o arquivo de imagem.
        filename: function(req, file, cb){
            cb(null, file.originalname); //Nome do arquivo original a ser criado na pasta uploads.
        }
    })
}
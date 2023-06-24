const db = require('./db')

const Post = db.sequelize.define('livraria', {
    titulo : {
        type : db.Sequelize.STRING
    },
    autor : {
        type : db.Sequelize.TEXT
    }
})

module.exports  = Post;
// Post.sync()
//   .then(() => {
//     console.log('Tabela criada com sucesso');
//   })
//   .catch((error) => {
//     console.error('Erro ao criar tabela:', error);
//   });


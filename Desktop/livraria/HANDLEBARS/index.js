const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const Post = require('../models/Post'); // Recebendo o banco de dados

const app = express();
const port = 8081;
app.set('views', path.join(__dirname, 'view'));

// Configuração do template engine
const handlebars = exphbs.create({ 
  defaultLayout: 'main',
  extname: '.handlebars',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true,
  },
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rotas
app.get('/', (req, res) => {
  Post.findAll({ order: [['id', 'DESC']] }).then((posts) => {
    res.render('home', { posts: posts }); 
  }); //retornando tudo dentro da tabela post
});

app.get('/', (req, res) => {
  res.send('Servidor Online');
});

// Conectando com o handlebars
app.get('/cad', (req, res) => {
  res.render('formulario');
});

// Rota que o user será enviado quando enviar o formulário
// O conteúdo da página HTML está sendo inserido nessa rota
app.post('/add', (req, res) => {
  Post.create({
    titulo: req.body.titulo,
    autor: req.body.autor,
  })
    .then(() => {
      res.redirect('/');
    })
    .catch((erro) => {
      res.send('Erro na criação do post ' + erro);
    });
});

// deletar posts 
app.get('/deletar/:id', (req, res) => {
  Post.destroy({where: {'id':req.params.id}} ).then(() =>{
    res.send("Postagem deletado com sucesso");
  }).catch((erro)=> {
    res.send("Esse post não existe!! " + erro);
  });
});


// Middleware para lidar com erros
app.use((err, req, res, next) => {
  console.error(err); // Imprime o erro no console
  res.status(500).send('Erro interno do servidor'); // Envia uma resposta de erro 500
});

// Inicialização do servidor
app.listen(port, () => {
  console.log(`Servidor alocado no http://localhost:${port}`);
});

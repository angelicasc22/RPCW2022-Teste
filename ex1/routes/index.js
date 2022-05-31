var express = require('express');
var router = express.Router();
var Cidade = require('../controllers/cidade')
var Ligacao = require('../controllers/ligacao')


/* GET /api/cidades - Devolve a lista das cidades, com os campos: id, nome, e distrito; */
router.get('/cidades', function(req, res, next) {
  // GET /api/cidades?distrito=DDDD - Devolve a lista de cidades pertencentes ao distrito DDDD, para cada cidade apresenta os campos: id e nome;
  if (req.query['distrito']!=undefined) {
    Cidade.listarBydistrito(req.query['distrito'])
    .then(dados => res.jsonp(dados))  
    .catch(erro => res.status(500).jsonp(erro))
  }else{
    Cidade.listar()
    .then(dados => res.jsonp(dados))  
    .catch(erro => res.status(500).jsonp(erro))
  }
  
});

// GET /api/cidades/nomes - Devolve apenas uma lista com os nomes das cidades ordenada alfabeticamente;
router.get('/cidades/nomes', function(req, res, next) {
  Cidade.listarCidades()
  .then(dados => res.jsonp(dados))
  .catch(erro => res.status(500).jsonp(erro))
});

// GET /api/cidades/:id - Devolve a informação completa de uma cidade;
router.get('/cidades/:id', function(req, res, next) {
  Cidade.consultar(req.params.id)
  .then(dados => res.jsonp(dados))
  .catch(erro => res.status(500).jsonp(erro))
});

//GET /api/distritos - Devolve uma lista de distritos em que para cada distrito apresenta os campos: nome do distrito e lista de cidades pertencentes ao distrito (apenas id e nome de cada cidade).
router.get('/distritos', function(req, res, next) {
  Cidade.listarDistritos()
  .then(dados => res.jsonp(dados))
  .catch(erro => res.status(500).jsonp(erro))
});

// GET /api/ligacoes?origem=XX - Devolve a lista de ligações que têm a cidade XX como origem, a lista deverá ter os seguintes campos: id da ligação, id da cidade destino, nome da cidade destino;
router.get('/ligacoes',  function(req, res, next) {
  if (req.query['origem']!=undefined) {
    
    Ligacao.ligacaoByOrigem(req.query['origem']) // {_id:0,id ligacao:1, id destino :1})
    .then(async dados =>{
        lista=[]
        // find the cidade name for each field destino in dados
          for( elem of dados){
          let x = await Cidade.consultar(elem.destino)
          obj={
              id: elem.id,
              destino: elem.destino,
              cidade_destino: x.nome
            }
            lista.push(obj)
        }
        res.jsonp(lista)
    })
    .catch(erro => res.status(500).jsonp(erro))
    
    
  }else if (req.query['dist']!=undefined) {
      // GET /api/ligacoes?dist=YY - Devolve a lista de ligações que têm uma distância maior ou igual a YY, a lista deverá ter os seguintes campos: id da ligação, id da cidade origem, nome da cidade origem, id da cidade destino e nome da cidade destino.
      Ligacao.ligacaoBydist(req.query['dist']) //{_id:0,id:1,origem:1,nomeOrigem:'',destino:1,nomeDestino:''}s
      .then(async dados =>{
          lista=[]
          console.log(dados)
          // find the cidade name for each field destino in dados
            for( elem of dados){
            let d = await Cidade.consultar(elem.destino)
            let o = await Cidade.consultar(elem.origem)
            obj={
                id: elem.id,
                destino: elem.destino,
                origem: elem.origem,
                nomeOrigem: o.nome,
                destino: elem.destino,
                nomeDestino: d.nome
              }
              lista.push(obj)
          }
          res.jsonp(lista)
      })
    .catch(erro => res.status(500).jsonp(erro))
  }
});
module.exports = router;

const mongoose = require('mongoose')
const ligacao = require('../models/ligacao')
var Ligacao = require('../models/ligacao')


module.exports.ligacaoByOrigem = (origem) => { 
    // Preciso de ir burcar i nome deste ao outro controller 
    // GET /api/ligacoes?origem=XX - Devolve a lista de ligações que têm a cidade XX como origem, a lista deverá ter os seguintes campos: id da ligação, id da cidade destino, nome da cidade destino;
    return Ligacao
        .find({origem:origem},{_id:0,id:1,destino:1,cidade_destino:""})
        .exec()
}


module.exports.ligacaoBydist = (dist) => {
    // GET /api/ligacoes?dist=YY - Devolve a lista de ligações que têm uma distância maior ou igual a YY, a lista deverá ter os seguintes campos: id da ligação, id da cidade origem, nome da cidade origem, id da cidade destino e nome da cidade destino.
    return Ligacao
        .find({distancia:{$gte:dist}},{_id:0,id:1,origem:1,nomeOrigem:'',destino:1,nomeDestino:''})
        .exec()
}   

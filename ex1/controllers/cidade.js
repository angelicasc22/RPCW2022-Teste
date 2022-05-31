const mongoose = require('mongoose')
const cidade = require('../models/cidade')
var Cidade = require('../models/cidade')

module.exports.listar = () => {  
    // GET /api/cidades - Devolve a lista das cidades, com os campos: id, nome, e distrito;
    return Cidade
        .find({},{_id:0,id:1,nome:1,distrito:1})
        .exec()
}

// GET /api/cidades/:id - Devolve a informação completa de uma cidade;
module.exports.consultar = (id) => {
    return Cidade
        .findOne({id:id},{_id:0})
        .exec()
}   

// GET /api/cidades/nomes - Devolve apenas uma lista com os nomes das cidades ordenada alfabeticamente;
module.exports.listarCidades = () => {
    return Cidade
        .find({},{_id:0,nome:1})
        .sort({nome:1})
        .exec()
}

//GET /api/cidades?distrito=DDDD - Devolve a lista de cidades pertencentes ao distrito DDDD, para cada cidade apresenta os campos: id e nome;
module.exports.listarBydistrito = (dist) => {
    return Cidade
        .find({distrito:dist},{_id:0,id:1,nome:1})
        .exec()
}

// GET /api/distritos - Devolve uma lista de distritos em que para cada distrito apresenta os campos: nome do distrito e lista de cidades pertencentes ao distrito (apenas id e nome de cada cidade).
module.exports.listarDistritos = () => {
    return Cidade
        .aggregate([
            {$group: {_id: "$distrito", cidades: {$addToSet: "$nome"}}}
        ])
        .exec()
}       


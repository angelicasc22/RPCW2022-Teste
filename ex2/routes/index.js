var express = require('express');
var router = express.Router();
const axios = require('axios').default;
token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTRlY2VhNmI1ZDVjMjQ3NmNmMDhiMSIsImxldmVsIjozLjUsImVudGlkYWRlIjoiZW50X0EzRVMiLCJlbWFpbCI6InJwY3cyMDIyQGdtYWlsLmNvbSIsImlhdCI6MTY1NDAxNTg1MiwiZXhwIjoxNjU0MDQ0NjUyfQ.t4lJpHEcd2G5fRgPBOR7opqnf1eU-fN1cC_37Xb58x7ObaHoLjgrL5Y9zRRcXwTzJqGstDauLswm7I6DWsz-1BhHo2EyBSSBHWzMUNiKiFS5BD9jNji8J9gpJBmbmRS2Ezx-80HeMmehYOAVIIhJIN9QybrZGf4D8JRhZyDGDVOuV-PqW1Ax6drslfOG6GcrsGcev0C5th6EWZD0GmwAu01S10QIDDH2ZThtO8GIOVzLeE9OoPyDpPeaeZ4b9UQk_g7uhsL9oCFXlAOKuqmrrbGFP64CbIQ6BilKe9Y_0narUBgpmx5D90TN2PthTdoZdTwacEgYwiDKc9npXXU5hw"
/*
function logado(req, res, next) {
  if(req.cookies.token) {
    next();
    return;
  } else {
    res.redirect('/users/login');
  }
}
router.use(logado);
*/


/* GET home page. */
router.get('/', (req, res) => {
  res.render('index');
});
router.get('/classes', (req, res) => {
  axios.get('http://clav-api.di.uminho.pt/v2/classes?nivel=1&estrutura=lista&token=' + token)
  .then(resp => res.status(200).render('classes', { classes: resp.data }))
  .catch(error => res.status(500).render('error', { error }))
});

router.get('/termosIndice', (req, res) => {
  axios.get('http://clav-api.di.uminho.pt/v2/termosIndice?token=' + token)
  .then(resp => res.status(200).render('termos', { termos: resp.data }))
  .catch(error => res.status(500).render('error', { error }))
});

router.get('/:nivel1.:nivel2', (req, res) => {
  const className = [req.params.nivel1, req.params.nivel2].join('.');
  axios.get('http://clav-api.di.uminho.pt/v2/classes/c' + className + '?token=' + token)
  .then(resp => res.status(200).render('classe', { classe: resp.data }))
  .catch(error => res.status(500).render('error', { error }))
});

router.get('/:nivel1', (req, res) => {
  axios.get('http://clav-api.di.uminho.pt/v2/classes/c' + req.params.nivel1 + '?token=' + token)
  .then(resp => res.status(200).render('classe', { classe: resp.data }))
  .catch(error => res.status(500).render('error', { error }))
});





module.exports = router;

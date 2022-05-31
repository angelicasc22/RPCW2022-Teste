var express = require('express');
var router = express.Router();
const axios = require('axios').default;
/* GET users listing. */

token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTRlY2VhNmI1ZDVjMjQ3NmNmMDhiMSIsImxldmVsIjozLjUsImVudGlkYWRlIjoiZW50X0EzRVMiLCJlbWFpbCI6InJwY3cyMDIyQGdtYWlsLmNvbSIsImlhdCI6MTY1NDAxNTg1MiwiZXhwIjoxNjU0MDQ0NjUyfQ.t4lJpHEcd2G5fRgPBOR7opqnf1eU-fN1cC_37Xb58x7ObaHoLjgrL5Y9zRRcXwTzJqGstDauLswm7I6DWsz-1BhHo2EyBSSBHWzMUNiKiFS5BD9jNji8J9gpJBmbmRS2Ezx-80HeMmehYOAVIIhJIN9QybrZGf4D8JRhZyDGDVOuV-PqW1Ax6drslfOG6GcrsGcev0C5th6EWZD0GmwAu01S10QIDDH2ZThtO8GIOVzLeE9OoPyDpPeaeZ4b9UQk_g7uhsL9oCFXlAOKuqmrrbGFP64CbIQ6BilKe9Y_0narUBgpmx5D90TN2PthTdoZdTwacEgYwiDKc9npXXU5hw"

router.post('/login', (req, res) => {
  axios.post('http://clav-api.di.uminho.pt/v2/users/login', { username: req.body.username, password: req.body.password })
    .then(resp => {
      console.log(req.body);
      if(resp.status !== 200) {
        res.send('Fallha');
      } else {
        res.cookie('token', resp.data.token);
        res.send('Sucesso');
      }
    })
    .catch(error => res.status(500).send('falha'));
});



module.exports = router;

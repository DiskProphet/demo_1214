var express = require('express')
var app = express()
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
})); // for parsing application/x-www-form-urlencoded


app.post('/Login', function (req, res) {
  const {
    username,
    password
  } = req.body

  if (username === 'admin' && password === 'admin') {
    res.writeHead(200, {
      "Content-Type": "application/json;charset=utf-8",
      /*'Set-Cookie': 'Authorization=Bearer eyJrIjoib0lsZ3IxMGJZeDJMdlVQUEQ2QW9EQ1d4VnQxdXlMbzMiLCJuIjoidG9rZW4iLCJpZCI6MX0=, "language=javascript";path=/;httpOnly=true',
      "domain":".test.com",
      "Access-Control-Allow-Credentials": "true"*/
    });
    res.end(JSON.stringify({
      logined: true,
      apiKey: 'Bearer eyJrIjoib0lsZ3IxMGJZeDJMdlVQUEQ2QW9EQ1d4VnQxdXlMbzMiLCJuIjoidG9rZW4iLCJpZCI6MX0='
    }));

  } else {
    res.end(JSON.stringify({
      logined: false,
      reson: '账号错误'
    }));
  }
})

var server = app.listen(8088, '127.0.0.1', function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

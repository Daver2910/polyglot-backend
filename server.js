const http = require('http');
const App = require('./API');

const port = process.env.PORT || 4000;

const server = http.createServer(App);

server.listen(port, () => console.log('api server listening on port '+ port));

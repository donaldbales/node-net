const net = require('net');
const util = require('util');

function short(obj) {
  return `${util.inspect(obj, true, 3, false)}`.replace(/\n/gi, '').slice(0, 80);  
}
/*
const server = net.createServer((arg1, arg2, arg3) => {
  console.log(`\n*** net.createServer()`);
  console.log(short(arg1)); // request
  console.log(short(arg2)); // response
  console.log(short(arg3)); // undefined
});
*/
const server = net.createServer((socket) => {
  socket.on('data', (data) => {
    console.log(`\n*** socket on data`);
    console.log(data.toString());
    socket.write(`${data}`);
    if (data.toString().slice(0, 3) === 'GET') {
      socket.end();
    }
  });
  console.log(`\n*** net.createServer's listener callback...`);
  console.log(short(socket));
  /* Interesting
  const props = [];
  for (const prop in socket) {
    props.push(prop);
  }
  props.sort();
  for (const prop of props) {
    console.log(`${prop}${typeof(socket[prop]) === 'function' ? '()' : ': ' + typeof(socket[prop])}`);
  }
  */
});

server.on('close', () => {
  console.log(`\n*** server on close`);
});

server.on('connection', (socket) => {
  socket.on('close', (hadError) => {
    console.log(`\n*** socket on close`);
  });
  console.log(`\n\n*** server on connection`);
  console.log(short(socket));
});

server.on('listening', () => {
  console.log(`\n*** server on listening`);
});

server.listen({ host: 'localhost', port: 8001 });
  
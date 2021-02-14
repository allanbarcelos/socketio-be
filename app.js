const express = require('express');
const socket = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');


var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

const app = express();
app.use(allowCrossDomain);
app.use(bodyParser);
let x = true;


const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

const io = socket(server);

io.sockets.on('connection', (socket) => {
    console.log(`new connection id: ${socket.id}`);
    sendData(socket);
})

function sendData(socket){
    
    if(x){
        socket.emit('data1', Array.from({length: 8}, () => Math.floor(Math.random() * 590)+ 10));
        x = !x;
    }else{
        socket.emit('data2', Array.from({length: 8}, () => Math.floor(Math.random() * 590)+ 10));
        x = !x;
    }

    console.log(`data is ${x}`);

    setTimeout(() => {
        sendData(socket);
    }, 2000);

}
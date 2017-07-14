const express = require('express')
const http = require('http');
const path = require('path')

const app = express()
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, '../static')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../static/index.html'))
})

const users = {}

io.on('connection', (socket) => {
  console.log('user connected')

  socket.on('message', (message) => {
    console.log('received message', message)
    const data = message
    const conn = users[data.name];

    switch (data.type) {
      case "login":
        console.log(data.name, 'logging in');

        if(users[data.name]) {
          socket.send({
            type: "login",
            success: false
          })
        } else {
          users[data.name] = socket;
          socket.name = data.name;

          socket.send({
            type: "login",
            success: true
          })
        }
        break;
      case "offer":
        console.log("Sending offer to: ", data.name);


        if(conn != null) {
          socket.otherName = data.name;

          socket.send({
            type: "offer",
            offer: data.offer,
            name: socket.name
          })
        }
        break;
      case "answer":
        console.log("Sending answer to: ", data.name);

        if(conn != null) {
          socket.otherName = data.name;
          socket.send({
            type: "answer",
            answer: data.answer
          })
        }
        break;
      case "candidate":
        console.log("Sending candidate to:",data.name);

        if(conn != null) {
          socket.send({
            type: "candidate",
            candidate: data.candidate
          })
        }
        break;
      case "leave":
        console.log("Disconnecting from", data.name);
        conn.otherName = null;

        if(conn != null) {
          socket.send({
            type: "leave"
          })
        }

        break;
    }
  })
  socket.on("close", function() {

    if(socket.name) {
      delete users[socket.name];

      if(socket.otherName) {
        console.log("Disconnecting from ", socket.otherName);
        const conn = users[socket.otherName];
        conn.otherName = null;

        if(conn != null) {
          socket.send({
             type: "leave"
          })
        }
      }
    }
  });

  socket.send('Hello from server')

});

server.listen(3000);

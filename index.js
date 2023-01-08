const express = require('express')
const { Socket } = require('socket.io')
const app = express()
const http = require('http').createServer(app)
const PORT = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'))


http.listen(PORT, () => {
    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html')
    });
    console.log(`server is listning on port ${PORT}`)

});


const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('Connected..')
    socket.on('massage',(mark)=>{
        socket.broadcast.emit('massage',mark)
    })
    socket.on ('disconnect',()=>{console.log('Disconnected')})
})
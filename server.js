//html content 
const express = require('express')
const PORT = process.env.PORT || 3000;
const LOCALHOST = process.env.LOCALHOST || '0.0.0.0';
const path = require('path')
const app = express();

const server = require('http').createServer(app)

const io = require('socket.io')(server)


app.use(express.static(__dirname + '/public'))
// app.use(express.static('/images', __dirnamae + '/public/images'))

app.get('/', (req,res) => {
	res.sendFile(path.join(__dirname + '/public/index.html'))
})

app.get('/about', (req, res) => {
	res.sendFile(path.join(__dirname + '/public/about.html'))
})

app.get('/chat', (req, res) => {
	res.sendFile(path.join(__dirname + '/public/chat.html'))
})

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/public/404.html'))
})


// socket io
io.on('connection', (socket) => {
	socket.on('newuser', (username) => {
		socket.broadcast.emit('update', username + " joined the chat.")
	})
	socket.on('exit', (username) => {
		socket.broadcast.emit('update', username + " left the chat.")
	})
	socket.on('chat', (message) => {
		socket.broadcast.emit('chat', message)
	})
})

server.listen(PORT , LOCALHOST, () => {
	console.log(`Server running at localhost:${PORT}!`);
});

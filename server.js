//html content 
const express = require('express')
const PORT = process.env.PORT || 3000;
const LOCALHOST = process.env.LOCALHOST || '0.0.0.0';
const path = require('path')
const app = express();
const nodeFetch = require('node-fetch')
const moment = require('moment')

const server = require('http').createServer(app)

const io = require('socket.io')(server)

const request = require('request-promise')
const cheerio = require('cheerio')
const cors = require('cors')

app.use(express.static(__dirname + '/public'))
// app.use(express.static('/images', __dirnamae + '/public/images'))

app.use(cors({
	origin:'*',
	methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}))

app.get('/', (req,res) => {
	res.sendFile(path.join(__dirname + '/public/index.html'))
})

app.get('/about', (req, res) => {
	res.sendFile(path.join(__dirname + '/public/about.html'))
})

app.get('/chat', (req, res) => {
	res.sendFile(path.join(__dirname + '/public/chat.html'))
})

app.get('/socmed', (req, res, next) => {
	res.sendFile(path.join(__dirname + '/public/socmed.html'))
	next()
})

// get ig response data via ajax
app.get('/api/igdata', cors(), async (req, res, next) => {
	const USERNAME = 'dreingineer';
	const BASE_URL = `https://www.instagram.com/${USERNAME}`

	let response = await request(
		BASE_URL,
		{
			'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
			'accept-encoding': 'gzip, deflate, br',
			'accept-language': 'en-US,en;q=0.9,fr;q=0.8,ro;q=0.7,ru;q=0.6,la;q=0.5,pt;q=0.4,de;q=0.3',
			'cache-control': 'max-age=0',
			'upgrade-insecure-requests': '1',
			'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36'
		}
	)

	let $ = cheerio.load(response)

	let script = $('script').eq(4).html()

	let { entry_data: { ProfilePage : {[0] : { graphql : {user} }} } } = JSON.parse(/window\._sharedData = (.+);/g.exec(script)[1]);

	console.log(user);

	res.send(user);
	
	debugger;
})

// covid api call 
app.get('/api/covid-update-now', async(req, res) => {
	try {
		const covidApiUrl = "https://api.apify.com/v2/key-value-stores/lFItbkoNDXKeSWBBA/records/LATEST?disableRedirect=true"
		const response = await nodeFetch(covidApiUrl)
		const jsonCovid = await response.json()
		res.json(jsonCovid)
	} catch(err) {
		console.log(err)
	}
})

// default route
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/public/404.html'))
})


// socket io
io.on('connection', (socket) => {
	socket.on('newuser', (username) => {
		socket.broadcast.emit('update', username + " joined our lounge. 🙋")
	})
	socket.on('exit', (username) => {
		socket.broadcast.emit('update', username + " left our lounge. 💘")
	})
	socket.on('chat', (message) => {
		socket.broadcast.emit('chat', message)
	})
})

server.listen(PORT , LOCALHOST, () => {
	console.log(`Server running at localhost:${PORT}!`);
});

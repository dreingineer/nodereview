const express = require('express')
const PORT = process.env.PORT || 5000;
const LOCALHOST = process.env.LOCALHOST || '0.0.0.0';
const path = require('path')
const app = express();
const nodeFetch = require('node-fetch')

const server = require('http').createServer(app)

const io = require('socket.io')(server)

const request = require('request-promise')
const cheerio = require('cheerio')
const cors = require('cors')
const Datastore = require('nedb')
const { now } = require('moment')
const emailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport')

const { insertBefore } = require('cheerio/lib/api/manipulation');
const database = new Datastore('dreisdatabase.db')

database.loadDatabase()

// database.insert({name:'Andrei', status: 'curious'})
// database.insert({name:'Bloom', status: 'studying php!'})

app.use(express.static(__dirname + '/public'))
//to map images folder
app.use('/images', express.static(__dirname + '/public/images'))

// para maka pasok ung json from ajax/fetch api/ client side js
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({limit:'50mb', extended: true}))
// parse application/json
app.use(express.json({limit:'50mb', extended: true}))

app.use(cors({
	origin:'*',
	methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}))

// pages router
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

app.get('/visitorform', (req, res) => {
	res.sendFile(path.join(__dirname + '/public/visitorForm.html'))
})

// CRUD controller
// post api routes
app.post('/api/formdata', async (request, response) => {
	let data = request.body
	console.log(data)
	let timestamp = Date.now()
	data.timestamp = timestamp
	let result = await database.insert(data)
	let saved = await response.json(result)

	// notifies email after sending comment

	let mailOptions = {
		from: data.visitorEmail,
		subject: `Comment from ${data.visitorName} - ${data.visitorEmail} | ${data.visitorStatus}`,
		html: `<div>
						<h4>${data.visitorName} | ${data.visitorStatus}</h4>
						<p>Commented: ${data.visitorComment}</p>
					</div>`
	};

	await emailService(mailOptions)
})

// api to get data from nedb
app.get('/api/formdata', async (req, res) => {
	await database.find({}, (err, docs) => {
		if(err) {
			console.error(err)
			res.end()
			return
		}
		else {
			// console.log('from nedb', docs)
			res.send(docs)
		}
	})
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

// send email
app.post('/api/send-email', async (req, res) => {
	let recievedEmailBody = req.body;
	console.log(recievedEmailBody)

	res.status(200).send({message:'OK'})

	let mailOptions = {
		from: req.body.email,
		subject: `Message from ${req.body.name} - ${req.body.email}: ${req.body.subject}`,
		text: req.body.emailbody
	};

	await emailService(mailOptions)
});


// default route
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/public/404.html'))
})


// socket io
io.on('connection', (socket) => {
	socket.on('newuser', (username) => {
		socket.broadcast.emit('update', username + " joined our lounge. ????")
	})
	socket.on('exit', (username) => {
		socket.broadcast.emit('update', username + " left our lounge. ????")
	})
	socket.on('chat', (message) => {
		socket.broadcast.emit('chat', message)
	})
})

// email sender function
const emailService = async (mailOptions) => {
	console.log(mailOptions)
	const ownEmail = 'info.andreiapp@gmail.com'
	const ownPass = 'Infotestapp1!'

	let transporter = await emailer.createTransport(smtpTransport({
		service: 'gmail',
		secure: false,
		auth: {
			user: ownEmail,
			pass: ownPass
		},
		tls: {
			rejectUnauthorized: false
		}
	}))

	mailOptions.to = `${ownEmail}, ${mailOptions.from}`

	await transporter.sendMail(mailOptions, (error, info) => {
		if(error) {
			console.log(error)
			// res.send(error)
		} else {
			console.log(info.response)
			// res.status(200)
		}
		transporter.close()
	})
	// res.status(200);
}

server.listen(PORT , LOCALHOST, () => {
	console.log(`Server running at localhost:${PORT}!`);
});

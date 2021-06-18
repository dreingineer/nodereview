//html content 
const http = require('http')
const PORT = process.env.PORT || 3000;
const LOCALHOST = process.env.LOCALHOST || '0.0.0.0';
const fs = require('fs');

const server = http.createServer((req, res) => {
	
	
	res.setHeader('Content-Type', 'text/html');
	// res.write('Hello World again')
	// res.write('Hello World ulit')
	// res.end('<h1>Hello World!!!</h1>')
	
	let path = './';
	switch(req.url) {
		case '/':
			path += 'index.html';
			res.statusCode = 200;
			break;
		case '/about':
			path += 'about.html';
			res.statusCode = 200;
			break;
		default:
			path += '404.html';
			res.statusCode = 404;
			break;
	}
	
	fs.readFile(path, (err, data) => {
		if(err) {
			console.error(err)
			res.end();
		} else {
			// res.write(data)
			res.end(data);
		}
	})
})

server.listen(PORT , LOCALHOST, () => {
	console.log(`server running at ${PORT}!`);
});





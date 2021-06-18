//html content 
const http = require('http')
const PORT = process.env.PORT || 3000;
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

server.listen(PORT, () => {
	console.log('server running at port 3000');
});






//reading from other file 
// const addNums = require('./addNums');
// import { addNums } from './addNums.js';

// const sum = addNums(2, 2);
// console.log(sum);





//###############writing a file#################
// const {writeFile, writeFileSync} = require('fs');
// const newContent = '\nThis is some new text';
//synchronous
// try {
// 	const data = writeFileSync("hi.txt", newContent, {flag:'a'});
// 	console.log("content written synchronously.")
// } catch(err) {
// 	console.error(err);
// }

//asynchronous


// writeFile('hi.txt', newContent, {flag:'a'}, (err)=> {
// 	if(err) {
// 		return console.error(err)
// 	}
// 	console.log('Content written')
// })



//###############reading a file################## 

// const { readFile, readFileSync} = require('fs');
// synchronous (blocking)
// try {
// 	const data = readFileSync("hi.txt", "utf-8")
// 	console.log(data);
// } catch(err) {
// 	console.error(err);
// }


//asynchronous (non blocking)
// readFile('hi.txt', (err, data) => {
// 	if(err) {
// 		return console.log(err);
// 	}
// 	else console.log(data.toString());
// })

// console.log("Log from outside");







//#########basic example hello world##############

// const http = require('http');

// const HOSTNAME = process.env.HOSTNAME || 'localhost';
// const PORT = process.env.PORT || 3000;

// const server = http.createServer((request, response) => {
// 	response.statusCode = 200;
// 	response.setHeader("Content-Type", "text/plain");
// 	response.end("Hello World")
// }) 

// server.listen(PORT, HOSTNAME, () => {
// 	console.log(`Server running at http://${HOSTNAME}:${PORT}`)
// })

//#############global##################
// console.log(__dirname);
// console.log(__filename);
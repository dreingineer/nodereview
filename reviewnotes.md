node is asynchronous
non blocking

synchronous is blocking

node is only global, no window and document object.

modules:
-http
-fs
	-readFile, readFileSync
	-writeFile, writeFileSync
	-append
	-rename
	-unlink (delete file)

for lower version of node, to run with es6 use --experimental-modules flag when running:
	eg: node --experimental-modules .\server.mjs
	make sure file extension is .mjs

http module
200 ok
300 redierect
400 errors (404 not found, 403)
500 server errors




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

<blockquote>
<p>"You mustn't let mistakes weigh you down. Acknowledge them and take what you've learned to move on. That is
the
privilege of being a man."</p>
<footer>Full Frontal</footer>
</blockquote>
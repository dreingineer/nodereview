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

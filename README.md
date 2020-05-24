## What is NPM:
* npm is the world's largest Software Library.
* npm is also a software Package Manager and Installer.
* npm includes a CLI (Command Line Interface) that can be used to download and install software.
* npm is installed with Node.js.
* This means that you have to install Node.js to get npm installed on your computer.

### Blocking are operations that block further execution until that operation finishes while non-blocking refers to code that doesn't block execution.
In node.JS, blocking is when the execution of additional JS in Node.js process must wait until a non-JS operations completes.

### eventLoop: Node can achieve very high i/o performance through the event loop
Nodejs uses event bases programming model and non-blocking i/o operations at its heart.
When node receive the request from client, it will put the request in an event queue, the event loop runs indefinitelly
to retrieve the request from event queue. If the request doesn't involve a blocking i/o operation, node will simply process
and repair the response and send it back to the client. If the request requires block i/o operation,
node will delegate it to work with thread and thread pool to work on the blocking i/o operation.
the blocking i/o operation may be associated with a callback function. When blocking i/o operation is completed,
the work thread will prepare the response, and send it back to the event loop.
Which then runs the callback function and sends the response back to the client. 
Therefore, the main program is not blocked by the i/o operations, so node keeps a single-thread of loop for our code.
evenyLoop simply execute our code asynchronously.

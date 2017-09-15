// get the http module:
var http = require('http');
// fs module allows us to read and write content for responses!!
var fs = require('fs');

var port = 3000;
// creating a server using http module:
var server = http.createServer(function server(request, response){
    // see what URL the clients are requesting:
    var file;
    
      switch (request.url) {
        case "/":
          file = 'index.html'
          break;
        case "/ninjas":
          file = 'ninjas.html'
          break;
        case "/dojos/new":
          file = 'dojos.html'
          break;
        default:
          file = null;
          break;
      }

    console.log('client request URL: ', request.url);
    // this is how we do routing:
    if (file !== null) {
        fs.readFile(`static/${file}`, 'utf8', function (err, contents){
            if (err) {console.log(err);}
            response.writeHead(200, {'Content-Type': 'text/html'});  // send data about response
            response.write(contents);  //  send response body
            response.end(); // finished!
        });
    }
    // request didn't match anything:
    else {
        response.writeHead(404);
        response.end('File not found!!!');
    }
});

// tell your server which port to run on
server.listen(port, function(){
// print to terminal window
    console.log("Running in localhost at port 3000");
});

var http = require('http'), 
url = require('url'),
path = require('path'),
fs = require('fs'),
io = require('socket.io'),
sys = require('sys'),

server = http.createServer(function(request , response){
	var uri = url.parse(request.url).pathname;
	var filename = path.join(process.cwd(), uri);
	path.exists(filename, function(ex){
		if(!ex){
			response.writeHead(404, {'Content-Type':'text/plain'});
			response.end("cant find it ....");
			return;
		}
		
		fs.readFile(filename, "binary", function(err , data){
			if(err){
				response.writeHead(500, {'Content-Type': 'text/plain'});
				response.write('404');
				response.end("nahi mili file");
				return;
			}
			
			response.writeHead(200);
			response.write(data, "binary");
			response.end("");
			//checking was removed from here
			
		});
		
	});

});

server.listen(8080);

// socket.io, I choose you
//var socket = io.listen(server);
var socket = io.listen(server);
process.openStdin().addListener("data", function(text){
	socket.broadcast(text);
});

socket.on('connection', function(client){
	//console.log(client); //working thing
	client.on('message', function(msg){
		console.log("msg =  " + msg + ",cid =" + client.sessionId);
		socket.broadcast(msg);
	});
});

/*socket.on('connection', function(client){

  client.on('message', function(){
	console.log('message from client on socket');
  });

  client.on('disconnect', function(){});

});

*/

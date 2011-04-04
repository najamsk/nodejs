var http = require('http'), 
	url = require('url'),
	path = require('path'),
	fs = require('fs'),
	sys = require('sys'),	
	net =  require('net');
/*
http.createServer(function (req, res) {

  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('najam sikander awan \n is great');
  
}).listen(8124, "192.168.2.101"); */

hserver = http.createServer(function(request , response){
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
			
			
			response.end("checking ");
		});
		
	});

});
hserver.listen(80, "192.168.1.9");

console.log('Server running at http://127.0.0.1:8124/');

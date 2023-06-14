// legge il contenuto di un file
// scrive il contenuto in un altro file
// rinomina il file scritto
// espone un server web che espone due risorse "/" e "/1"
// - la risorsa / si accede ad una pagina web dove ci sono
//		- il messaggio "Tra due secondi caricherò il contenuto del file" 
//		- uno script javascript che fa in modo che la pagina dopo 2 si riderezioni verso la risorsa "\1" del server appena avviato
// - la risorsa "/1" riporta il contenuto del file
// 

const fs = require('fs');
const http = require('http');

const hostname = '127.0.0.1';
const port = 3001;


console.log('Inizio');
const resp1 = `
<html>
<body>
Tra due secondi caricherò il contenuto del file
<script type="text/javascript">
	console.log('sono qui');
	setTimeout(
		() => {
			console.log('sono qui2');
			window.location='http://${hostname}:${port}/1';
		},
		2000
	);
</script>
</body>
</html>
`

fs.readFile(
	'./output/fileInput.txt',
	{
		encoding : 'utf8'
	},
	function(err, data) {
		console.log('Letto');
		if (err) {
			throw err;
		}
		console.log('Inizio Scrittura file output e pubblicazione web');

		
		const server = http.createServer(
			(req, res) => { 
				console.log('Richiesta');
				//console.log(req);
				
				res.statusCode = 200;     
				const url = req.url;
				console.log(url);
				switch(url) {
					case '/': {//inizio 
						res.writeHead(200, {'Content-Type': 'text/html'});
						res.write(resp1);
					}; break;
					case '/1': {//contenuto
						res.writeHead(200, {'Content-Type': 'text/html'});
						res.write(data);
					}; break;
					default: { //altro
						res.writeHead(200, {'Content-Type': 'text/plain'});
					}
				}
				res.end();
			}
		); 

		server.listen(
			port, 
			hostname, 
			() => { 
				console.log(`Server running at http://${hostname}:${port}/`);
			}
		);

		fs.writeFile(
			'./output/fileOutput.txt',
			data,
			(err) => {
				if (err) {
					throw err;
				}
				console.log('Scritto');
				console.log('Inizio ridenominazione');
				fs.rename(
					'./output/fileOutput.txt',
					'./output/myRenamedFile2.txt',
					(err) => {
						if (err) {
							throw err;
						}
						console.log('File Renamed!');
					}
				);
			}
		);
	}
);

const fs = require('fs');
const http = require('http');

function read(path, callback){ 
    fs.readFile(path, 'utf8', function (err, data) {
        if (err) throw err;
        console.log('read file!', data);  
        callback(data);
        
    });
}

function write(path, data, callback){
    fs.writeFile(path, data, function (err) {
            if (err) throw err;
            console.log('saved write!');  
            callback();
    });
}

function rename(patOld, pathNew, callback){
    fs.rename(patOld, pathNew, function (err) {
        if (err) throw err;
        console.log('rename!');  
        callback();
    });
}

const server = http.createServer((req, res) => { 
    res.statusCode = 200;     
    res.setHeader('Content-Type', 'text/plain'); 
    
    let pathToRead = 'file.txt';
    let pathToWrite = 'file2.txt';
    let newFilePath = "file2_da_rename.txt";

    read (pathToRead, (text) => {
        res.write("Read " + text + "\n")
        write(pathToWrite, text, () => {
            res.write("Write"+ "\n")
            rename(pathToWrite, newFilePath, () => {
                res.write("Rename"+ "\n")
                res.end();
            });
        });
    });
    
}).listen(8080); 

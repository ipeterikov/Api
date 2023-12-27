const soap = require('soap'); //node-soap
let http = require('http'),
    fs = require('fs');
    url = require('url'), // чтобы отследить роут
    { parse } = require('querystring'), // чтобы правильно взять параметры из запроса
    path = require('path');
    
const url_scheme = "http://www.dneonline.com/calculator.asmx?wsdl"

http.createServer(function(req, res) {
    if (req.url == '/' || req.url == '/index.js') {
        fs.readFile('./index.html', function (err, data) {
            res.writeHead(200, {'Content-Type': 'text/html','Content-Length':data.length});
            res.write(data);
            res.end();
        });
    }
    else if(req.url.match('style.css')){
        var cssPath = path.join(__dirname, req.url);
        var fileStream = fs.createReadStream(cssPath);
        res.writeHead(200, {"Content-Type": "text/css"});
        fileStream.pipe(res);
    }
    else if (req.url == '/add' && req.method == 'POST') { // когда что-то с методом POST "постучится" в роут '/add'
        let body = '';
    
        req.on('data', chunk => { // когда "придет" часть данных. добавляем их в body
            body += chunk.toString(); 
        });
    
        req.on('end', () => { // при завершении получения ответа. (когда уже все части данных пришли)
            let params = parse(body); // используем функцию parse из модуля querystring
            let intA = params.first_num;
            let intB = params.second_num;

            soap.createClient(url_scheme, function (err, client) {
                if (err) {
                    console.error(err);
                } else {
                    // Make SOAP request using client object
                    const args = { intA, intB };
                    client.Add(args, function (err, result){
                        if (err) {
                            console.error(err);
                        } else {
                            res.end(JSON.stringify(result)); 
                            console.log(result);
                        }
                    });
                }
            });
        });
    }
    else if (req.url == '/sub' && req.method == 'POST') { 
        let body = '';
    
        req.on('data', chunk => { 
            body += chunk.toString(); 
        });
    
        req.on('end', () => { 
            let params = parse(body); 
            let intA = params.first_num;
            let intB = params.second_num;

            soap.createClient(url_scheme, function (err, client) {
                if (err) {
                    console.error(err);
                } else {
                    // Make SOAP request using client object
                    const args = { intA, intB };
                    client.Subtract(args, function (err, result){
                        if (err) {
                            console.error(err);
                        } else {
                            res.end(JSON.stringify(result));
                            console.log(result);
                        }
                    });
                }
            });
        });
    }
    else if (req.url == '/mult' && req.method == 'POST') { 
        let body = '';
    
        req.on('data', chunk => {
            body += chunk.toString(); 
        });
    
        req.on('end', () => { 
            let params = parse(body); 
            let intA = params.first_num;
            let intB = params.second_num;

            soap.createClient(url_scheme, function (err, client) {
                if (err) {
                    console.error(err);
                } else {
                    // Make SOAP request using client object
                    const args = { intA, intB };
                    client.Multiply(args, function (err, result){
                        if (err) {
                            console.error(err);
                        } else {
                            res.end(JSON.stringify(result));
                            console.log(result);
                        }
                    });
                }
            });
        });
    }
    else if (req.url == '/div' && req.method == 'POST') { 
        let body = '';
    
        req.on('data', chunk => { 
            body += chunk.toString(); 
        });
    
        req.on('end', () => { 
            let params = parse(body); 
            let intA = params.first_num;
            let intB = params.second_num;

            soap.createClient(url_scheme, function (err, client) {
                if (err) {
                    console.error(err);
                } else {
                    // Make SOAP request using client object
                    const args = { intA, intB };
                    client.Divide(args, function (err, result){
                        if (err) {
                            console.error(err);
                        } else {
                            res.end(JSON.stringify(result));
                            console.log(result);
                        }
                    });
                }
            });
        });
    }
}).listen(8000);
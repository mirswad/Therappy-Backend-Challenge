
const http = require('http');
const express = require('express');
const url = require('url');


const app = express();

app.get('/I/want/title/', (req, res, next) => {

    const ad = req.query.address;   
    const urls = url.parse(req.url,true).query;
    //AsyncFor Each
    console.log(ad.length);

    var gettitle = (add) => {
        var optionss =  {
        host: add,      
        path: '/'
        }
         console.log(optionss);
            var request = http.request(optionss, function (res) {
             var data = '';
                res.on('data', function (chunk) {
                    data += chunk;
                });
                    res.on('end', function () {
                        let match = data.match(/<title>([^<]*)<\/title>/) // regular expression to parse contents of the <title> tag
                        if (!match || typeof match[1] !== 'string')
                        throw new Error('Unable to parse the title tag');  
                        console.log(match[1]);
        
                    });
            });
                request.on('error', function (e) {
                    console.log(e.message);
                });
                request.end();
        };
    
    const asyncForEach = async (ad) => {
        for (let index = 0; index < ad.length; index++) {
            await gettitle(ad[index]);             
        }
            
    };
        
      
    asyncForEach(ad);


    // var result = Object.keys(urls).map((key) => [Number(key), urls[key]]);
    // console.log(ad);
        
    

    // res.send("https://nodejs.org/en/");


    // const queryObject = url.parse('https://nodejs.org/en/', true).query;
    // console.log(queryObject);

    console.log('In the middleware!');
    res.send('Sucess');
    next(); // Allows the request to continue to the next middleware in line
});



const server = http.createServer(app);

server.listen(3000);

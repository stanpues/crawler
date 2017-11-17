var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
//var output  = "";
const url = 'http://www.nieuwsblad.be/cnt/dmf20171115_03189094';
//const url = 'http://snps04:Password@grbbrodiga01.core.local:9150/preview/data/story?adapt=true&Uuid=c28bc57a-ca54-11e7-92e4-9b28e8def83c&DbPath=/foobar&EmObjectType=EOM::WebPage&EmEnvironment=PROD';
app.get('/scrape', function(req, res){

    

    request(url, function(error, response, html){
        if(!error){
        
            const $ = cheerio.load(html);

            mycont = $('script');

            const parts = /article_externalid:"([^"]*)/g.exec(mycont);
            const myid = parts[1];
            const urlp1 = "http://snps04:Password@grbbrodiga01.core.local:9150/preview/data/story?adapt=true&Uuid=";
            const urlp2 = "&DbPath=/foobar&EmObjectType=EOM::WebPage&EmEnvironment=PROD";
            const urljson = urlp1+myid+urlp2;
        
          // console.log($(this));
           
           request(urljson, function(error, response, html){

                if(!error){
                  //  const $ = cheerio.load(html);                    
                }


                console.log
            
                fs.writeFile('output2.js', html, function(err){

                    console.log('File successfully written!');

                })
            })
            

        }
/*
      fs.writeFile('output2.js', outp, function(err){
       // fs.writeFile('output.json', JSON.stringify(outp, null, 4), function(err){

            console.log('File successfully written! - Check your project directory for the output.json file');

        })

        // Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
        res.send('Check your console!')
*/
    })
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;


////
// https://<username>:<paswoord>@grbbrodiga01.core.local:9150/preview/data/story?adapt=true&Uuid=c28bc57a-ca54-11e7-92e4-9b28e8def83c&DbPath=/foobar&EmObjectType=EOM::WebPage&EmEnvironment=PROD

////
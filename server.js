var express    = require('express'),
    app        = express(),
    request = require('request'),
    cheerio = require('cheerio'),
    fs = require('fs');


var port = process.env.PORT || 8080;

var router = express.Router();

router.use(function(req, res, next) {
    console.log('Something is happening.');
    next();
});

router.get('/', function(req, res) {
    var url = "http://www.michaelkors.com/women/clothing/_/N-28ef";
    var tmpObj = {};
    var myObj = [];
    request(url, function(err, resp, body) {
        if(!err && resp.statusCode == 200) {
            var $ = cheerio.load(body);
            $('.productPanelMain','#main_container').each(function() {
                tmpObj.image = ($(this).find('img').attr('src'));
                tmpObj.product = ($(this).find('.prod_name h6').text());
                tmpObj.category = ($(this).find('.prod_name span').text());
                tmpObj.price = ($(this).find('div.product_description').text()  );
                myObj.push(tmpObj);
            });
            res.send(myObj);
            console.log('data sent');
        } else {
            console.log(err);
        }
    });
    
});

// REGISTER ROUTES
app.use('/api', router);

// START SERVER
app.listen(port);
console.log('Listening on port: ' + port);
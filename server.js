var express = require('express');   //Express Web Server 
var js = require('./JS/utilities.js')
var http = require('http');
var app = express();
var engine = require('ejs-locals');
var bodyParser  = require("body-parser");
var session      = require('express-session');

global.appRoot = path.resolve(__dirname);

mongoose.connect(config.url, {server: {auto_reconnect: true,  poolSize: 10 }}, function(err) {    
    if (err) {
      console.log('errr');
      console.log(err);
    } else {
        console.log("db connected");
    }
});

var models_path = __dirname + '/App/Models'
fs.readdirSync(models_path).forEach(function (file) {
		if (~file.indexOf('.js')) require(models_path + '/' + file)
})

require('./JS/assignmodels.js')



app.engine('ejs', engine);
app.set('views', __dirname + '/App/Views');
app.set('view engine', 'ejs'); // set up ejs for templating

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' ,
    resave: true,
    saveUninitialized: true
})); // session secret

app.use(flash());
app.use(express.static(__dirname + '/Public'));
require('./App/routes.js')(app)



/*var user = new User();
user.id = '2';
user.name = 'bhavu';
user.password = "bhavu"
user.save(function (err) {
	if (err) {
		console.log(err);
	}else{
		console.log('in')
	}
});*/


/*Attendance.find().exec(function(err,data){ 
	if(data){
		console.log(data)
	}
});
*/

/*stripe.customers.create({
  email: 'bhumi.patel03@yahoo.com'
}).then(function(customer) {
  return stripe.charges.create({
    amount: 3200,
    currency: 'usd',
    source: "tok_17cuLMFXW7mzC5WUOwtBMqDj",
  });
}).then(function(charge) {
  console.log('charge' + charge)
  // New charge created on a new customer 
}).catch(function(err) {
  console.log(err)
  // Deal with an error 
});*/

/*stripe.products.create({
  name: 'T-shirt',
  description: 'Comfortable gray cotton t-shirts',
  attributes: ['size', 'gender']
}, function(err, product) {
  console.log(JSON.parse(product))
  // asynchronously called
});*/


process.on('uncaughtException', function (err) {
  console.error(err.stack);
  console.log(err)
  console.log("Node NOT Exiting...");
});

var server = app.listen(process.env.PORT || 6300, function() {
  console.log('Listening on port %d', server.address().port);
});
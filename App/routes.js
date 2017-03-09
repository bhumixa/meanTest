module.exports = function(app) {
	app.get('/', function(req, res) {	
		console.log('das')	
		res.render('index.ejs');
	}); 
	app.get('/dashboard', function(req, res) {   
		res.render('dashboard.ejs'); 
	}); 
}
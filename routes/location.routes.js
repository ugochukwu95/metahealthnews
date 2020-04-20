module.exports = (app) => {
	const locations = require('../controllers/location.controllers.js');

	app.get('/api/getlocation', locations.find);
}
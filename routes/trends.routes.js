module.exports = (app) => {
	const trends = require('../controllers/trends.controllers.js');

	// retrieve real time trends from google
	app.get('/api/trends', trends.findAll);
}
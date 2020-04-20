module.exports = (app) => {
	const weather = require('../controllers/weather.controllers.js');

	app.get('/api/getWeather', weather.find);
}
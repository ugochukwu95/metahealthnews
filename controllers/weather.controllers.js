const axios = require('axios');

// retrieve weather data
exports.find = async (req, res) => {
	if (!req.query.city) {
		res.status(500).send("City is required!");
	}

	const locale = req.query.city;

	const getLocationId = async () => {
		try {
			const response = await axios({url: `https://www.metaweather.com/api/location/search/?query=${locale}`, method: 'get'});
			const locations = await response.data;
  			return locations[0].woeid;
		}
		catch (error) {
			res.status(500).send(error.message);
		}
	}

	const fetchWeather = async woeid => {
    	const response = await axios(
    		{url: `https://www.metaweather.com/api/location/${woeid}/`, method: 'get'}
  		);
  		const { title, consolidated_weather } = await response.data;
  		const { weather_state_name, the_temp } = consolidated_weather[0];

		return {
		    location: title,
		    weather: weather_state_name,
		    temperature: the_temp,
		};
	};

	let woeid = await getLocationId();
	let data = await fetchWeather(woeid);

	if (data) {
		res.send(data);
	}
	else {
		res.status(500).send("Network Error! please check your connection.");
	}
}
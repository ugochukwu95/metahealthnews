const axios = require('axios');

// retrieve location data

// if location data not found or an error occurs
// send a default
exports.find = async (req, res) => {
	let ip = req.ip;
	console.log(ip);
	const getLocationData = async () => {
		try {
			// return await axios({url: 'https://geolocation-db.com/json', method: 'get'});
			if (ip) {
				return await axios({url: `https://ipinfo.io/${ip}?token=0756059bdf42d5`, method: 'get'});
			}
			return await axios({url: 'https://ipinfo.io?token=0756059bdf42d5', method: 'get'});
		}
		catch (error) {
			res.status(500).send({"country_code":"US","country_name":"United States","city":"New York"});
		}
	}

	let result = await getLocationData();
	/*if (result.data['country_code'] === "Not Found") {
		res.status(500).send({"country_code":"US","country_name":"United States","city":"New York"});
	}
	else {
		res.send(result.data);
	}*/
	if (result) {
		res.send({"country_code": result.data['country'], "city": result.data['city']})
	}
}
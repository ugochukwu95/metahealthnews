const googleTrends = require("google-trends-api");

exports.findAll = (req, res) => {
	const location = req.query.country || "US";
	
	googleTrends.dailyTrends({
		geo: location,
		category: "m"
	}, function(err, results) {
		if (err) {
			res.status(500).send({"error": "Something went wrong"});
		}
		else {
			res.send(results);
		}
	})
}
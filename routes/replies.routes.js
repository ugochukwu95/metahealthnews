module.exports = (app) => {
	const replies = require('../controllers/replies.controllers.js');

	// get reply replies
	app.get('/api/replies', replies.findAll);

	// add a reply
	app.post('/api/replies', replies.create);

	// update a reply
	app.put('/api/replies', replies.updateReply);

	// delete a reply
	app.delete('/api/replies', replies.deleteReply);

	// like a reply
	app.post('/api/replies/like', replies.like);

	// delete liked reply
	app.delete('/api/replies/like', replies.deleteLikeReply);

	// dislike a reply
	app.post('/api/replies/dislike', replies.dislike);

	// delete disliked reply
	app.delete('/api/replies/dislike', replies.deleteDislikedReply);
}
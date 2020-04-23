module.exports = (app) => {
	const comments = require('../controllers/comments.controllers.js');

	// get comments for an article
	app.get('/api/comments', comments.findAll);

	// Add a comment to an article
	app.post('/api/comments', comments.create);

	// update a comment
	app.put('/api/comments', comments.update);

	// delete a comment
	app.delete("/api/comments", comments.deleteComment);

	// like a comment
	app.post('/api/comments/like', comments.like);

	// delete liked comment
	app.delete('/api/comments/like', comments.deleteLikeComment);

	// dislike a comment
	app.post('/api/comments/dislike', comments.dislike);

	// delete disliked comment
	app.delete('/api/comments/dislike', comments.deleteDislikedComment);
}
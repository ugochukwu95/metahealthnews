module.exports = (app) => {
	const articles = require('../controllers/articles.controllers.js');

	app.post('/api/articles', articles.create);

	// Retrieve all articles
	app.get('/api/articles', articles.findAll);

	// Search for articles
	app.get('/api/articles/search', articles.search);

	// Retrieve a single article with articleId
	app.get('/api/articles/:articleId', articles.findOne);

	// Update an article with articleId
	app.put('/api/articles/:articleId', articles.update);

	// Delete a article with articleId
	app.delete('/api/articles/:articleId', articles.delete);
}
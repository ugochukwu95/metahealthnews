module.exports = (app) => {
	const articles = require('../controllers/articles.controllers.js');

	app.post('/api/articles', articles.create);

	// Save userid in article
	app.post('/api/articles/save', articles.saveUserInArticle);

	// Retrieve saved articles
	app.get('/api/articles/save', articles.findSavedArticles);

	// Remove user from articles
	app.delete('/api/articles/save', articles.deleteUserFromArticle);

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
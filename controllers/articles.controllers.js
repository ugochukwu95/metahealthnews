const Article = require('../models/articles.model.js');
const axios = require('axios');

// Create and save a new article
exports.create = (req, res) => {
	// Validate request
	if (!req.body.author) {
		return res.status(400).send({
			error: "Article author cannot be empty"
		})
	}

	// create an article
	const article = new Article({
		source: req.body.source,
		author: req.body.author,
		title: req.body.title,
		description: req.body.description,
		url: req.body.url,
		urlToImage: req.body.urlToImage,
		publishedAt: req.body.publishedAt,
		content: req.body.content
	});

	// Save article in the database
	article.save()
	.then(data => {
		res.send(data);
	}).catch(err => {
        res.status(500).send({
            error: err.message || "Some error occurred while creating the Article."
        });
    });
}

// Retrieving and returning all articles from the database
exports.findAll = async (req, res) => {

    let data = []; 
    const country = req.query.country || "us";
    const page = req.query.page;
    if (page == 1) {
        // Code to get articles from api
        const getArticles = async () => {
            try {
                return await axios({url: `https://newsapi.org/v2/top-headlines?apiKey=c9eb75a0e19345ccb50fe95a6d25a8af&category=health&country=${country}&pageSize=100`, method: 'get'});
            } catch(error) {

                // If an error occurs get articles from db instead
                Article.paginate({country: country}, { page: page, limit: 10, sort: { publishedAt: -1 } })
                .then(article => {
                    res.send(article);
                }).catch(err => {
                    res.status(500).send({
                        error: err.message || "Some error occurred while retrieving Articles."
                    });
                });
            }
        }

        // lets resolve the promise
        let headlines =  await getArticles();

        // We have no issues with the API
        if (headlines.data['status'] === "ok") {
            data = headlines.data['articles'];
        }

        // We have issues with the api
        // We simply get articles from db
        else if (headlines.data['status'] === "error") {
            Article.paginate({country: country}, { page: page, limit: 10, sort: { publishedAt: -1 } })
            .then(article => {
                res.send(article);
            }).catch(err => {
                res.status(500).send({
                    error: err.message || "Some error occurred while retrieving Articles."
                });
            });
        }
        

        if (data.length !== 0) {
            //results.filter(o => o['new'] === true);
            for (let i=0; i<data.length; i++) {
                if (data.hasOwnProperty(i)) {
                    if (data[i]['title'] === null || data[i]['urlToImage'] === null) {
                        continue;
                    }

                    let article = new Article({
                        source: data[i]['source'],
                        author: data[i]['author'],
                        title: data[i]['title'],
                        description: data[i]['description'],
                        url: data[i]['url'],
                        urlToImage: data[i]['urlToImage'],
                        publishedAt: data[i]['publishedAt'],
                        country: country,
                        content: data[i]['content']
                    });

                    article.save()
                    .then(data => {
                        // res.send(data);
                    }).catch(err => {
                        /*res.status(500).send({
                            error: err.message || "Some error occurred while creating the Article."
                        });*/
                    });
                }
            }
        }

        Article.paginate({country: country}, { page: page, limit: 10, sort: { publishedAt: -1 } })
        .then(article => {
            res.send(article);
        }).catch(err => {
            res.status(500).send({
                error: err.message || "Some error occurred while retrieving Articles."
            });
        });
    }
    else if (page > 1) {
        Article.paginate({country: country}, { page: page, limit: 10, sort: { publishedAt: -1 } })
        .then(article => {
            res.send(article);
        }).catch(err => {
            res.status(500).send({
                error: err.message || "Some error occurred while retrieving Articles."
            });
        });
    }
};

// searching the database 
exports.search = async (req, res) => {
    
    // Validate the request
    if (!req.query.searchString) {
        return res.status(400).send({
            error: "searchString cannot be empty"
        })
    }

    let data = [];
    const searchString = req.query.searchString;
    const country = req.query.country || "us";
    const page = Number(req.query.page);

    if (page == 1) {
        // Code to get articles from api
        const getArticles = async () => {
            try {
                return await axios({url: `https://newsapi.org/v2/top-headlines?apiKey=c9eb75a0e19345ccb50fe95a6d25a8af&q=${searchString}&country=${country}&category=health&pageSize=100`, method: 'get'});
            } catch(error) {
                // If an error occurs get articles from db instead
                Article.paginate({$text: {$search: searchString}, country: country}, { page: page, limit: 10, sort: { publishedAt: -1 } })
                .then(article => {
                    res.send(article);
                }).catch(err => {
                    res.status(500).send({
                        error: err.message || "Some error occurred while retrieving Articles."
                    });
                });
            }
        }

        // lets resolve the promise
        let headlines =  await getArticles();

        // We have no issues with the API
        if (headlines.data['status'] === "ok") {
            data = headlines.data['articles'];
        }

        // We have issues with the api
        // We simply get articles from db
        else if (headlines.data['status'] === "error") {
            Article.paginate({$text: {$search: searchString}, country: country}, { page: page, limit: 10, sort: { publishedAt: -1 } })
            .then(article => {
                res.send(article);
            }).catch(err => {
                res.status(500).send({
                    error: err.message || "Some error occurred while retrieving Articles."
                });
            });
        }
        

        if (data.length !== 0) {
            //results.filter(o => o['new'] === true);
            for (let i=0; i<data.length; i++) {
                if (data.hasOwnProperty(i)) {
                    if (data[i]['title'] === null || data[i]['urlToImage'] === null) {
                        continue;
                    }

                    let article = new Article({
                        source: data[i]['source'],
                        author: data[i]['author'],
                        title: data[i]['title'],
                        description: data[i]['description'],
                        url: data[i]['url'],
                        urlToImage: data[i]['urlToImage'],
                        publishedAt: data[i]['publishedAt'],
                        country: country,
                        content: data[i]['content']
                    });

                    article.save()
                    .then(data => {
                        // res.send(data);
                    }).catch(err => {
                        /*res.status(500).send({
                            error: err.message || "Some error occurred while creating the Article."
                        });*/
                    });
                }
            }
        }

        Article.paginate({$text: {$search: searchString}, country: country}, { page: page, limit: 10, sort: { publishedAt: -1 } })
        .then(article => {
            res.send(article);
        }).catch(err => {
            res.status(500).send({
                error: err.message || "Some error occurred while retrieving Articles."
            });
        });
    }
    else if (page > 1) {
        Article.paginate({$text: {$search: searchString}, country: country}, { page: page, limit: 10, sort: { publishedAt: -1 } })
        .then(article => {
            res.send(article);
        }).catch(err => {
            res.status(500).send({
                error: err.message || "Some error occurred while retrieving Articles."
            });
        });
    }


}

// Find a single article with a articleId
exports.findOne = (req, res) => {
	Article.findById(req.params.articleId)
    .then(article => {
        if(!article) {
            return res.status(404).send({
                error: "Article not found with id " + req.params.articleId
            });            
        }
        res.send(article);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                error: "Article not found with id " + req.params.articleId
            });                
        }
        return res.status(500).send({
            error: "Error retrieving article with id " + req.params.articleId
        });
    });
};

// Update an article identified by the articleId in the request
exports.update = (req, res) => {
	// Validate Request
    if(!req.body.name) {
        return res.status(400).send({
            error: "Article name cannot be empty"
        });
    }
    else if (!req.body.description) {
    	return res.status(400).send({
            error: "Article description cannot be empty"
        });
    }

    // Find Article and update it with the request body
    Article.findByIdAndUpdate(req.params.articleId, {
        source: req.body.source,
        author: req.body.author,
        title: req.body.title,
        description: req.body.description,
        url: req.body.url,
        urlToImage: req.body.urlToImage,
        publishedAt: req.body.publishedAt,
        content: req.body.content
    }, {new: true})
    .then(article => {
        if(!article) {
            return res.status(404).send({
                error: "Article not found with id " + req.params.articleId
            });
        }
        res.send(article);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                error: "Article not found with id " + req.params.articleId
            });                
        }
        return res.status(500).send({
            error: "Error updating Article with id " + req.params.articleId
        });
    });
};

// Delete an article with the specified articleId in the request
exports.delete = (req, res) => {
	Article.findByIdAndRemove(req.params.articleId)
    .then(article => {
        if(!article) {
            return res.status(404).send({
                error: "Article not found with id " + req.params.articleId
            });
        }
        res.send({message: "Article deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                error: "Article not found with id " + req.params.articleId
            });                
        }
        return res.status(500).send({
            error: "Could not delete article with id " + req.params.articleId
        });
    });
};
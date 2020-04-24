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

/*// Retrieving nigerian articles
exports.findNGArticles = async (req, res) => {
    async function fetchHTML(url) {
        const { data } = await axios.get(url)
        return cheerio.load(data)
    }

    const items = [];
    let $ = await fetchHTML("https://www.pulse.ng/lifestyle/beauty-health");
    $("a.itemWrapper").each(function(i, elem) {
        items[i] = $(this).attr("href");
    })

    let pulse = [];

    for (let i = 0; i<items.length; i++) {
        if (items.hasOwnProperty(i)) {

            try {
                $ = await fetchHTML(items[i]);
                let title = $("hi.mainTitle").text();

                /*if (!title) {
                    continue;
                }*/

                /*let author = $("span.name, div.authDesc").text() || null;
                let source = {"id": null, "name": "Pulse.ng"};
                let description = $("strong.hyphenate, .whitelistPremium").text();
                let url = items[i];
                let urlToImage = $("img, figure.mainPhoto").attr("src");

                /*if (!urlToImage) {
                    continue;
                }*/

                /*let publishedAt = strtotime($("time.datePublished, div.authDesc").text()); 
                console.log($("time.datePublished, div.authDesc").text());
                let country = "ng";
                //let content = striptags($("p.hyphenate, div#detail").text()) || null;

                let obj = {author, source, title, description, url, urlToImage, publishedAt, country};

                pulse.push(obj);
            }
            catch (error) {
                // do nothing
            }
        }
    }
    res.send(pulse);
    .or([])
}*/

// Retrieving and returning all articles from the database
exports.findAll = async (req, res) => {

    let data = []; 
    const country = req.query.country || "us";
    const page = req.query.page;
    const userId = req.query.userId
    if (page == 1) {
        // Code to get articles from api
        const getArticles = async () => {
            try {
                return await axios({url: `https://newsapi.org/v2/top-headlines?apiKey=c9eb75a0e19345ccb50fe95a6d25a8af&category=health&country=${country}&pageSize=100`, method: 'get'});
            } catch(error) {

                if (userId) {
                    if (country === "ng") {
                        // If an error occurs get articles from db instead
                        Article.paginate({$or: [{ "source.name": "Thenationonlineng.net" }, { "source.name": "Thisdaylive.com" }, { "source.name": "Aa.com.tr" }, { "source.name": "Pulse.ng" }, { "source.name": "Vanguardngr.com" }, { "source.name": "Naijanews.com" }, { "source.name": "Dailypost.ng" }, { "source.name": "Guardian.ng" }, { "source.name": "Tribuneonlineng.com" }, { "source.name": "Dailytrust.com.ng" }, { "source.name": "Channelstv.com" }, { "source.name": "Premiumtimesng.com" }], hiddenBy: {$nin: [userId]}}, { page: page, limit: 10, sort: { publishedAt: -1 } })
                        .then(article => {
                            res.send(article);
                        }).catch(err => {
                            res.status(500).send({
                                error: err.message || "Some error occurred while retrieving Articles."
                            });
                        });
                    }
                    // If an error occurs get articles from db instead
                    Article.paginate({$or: [{ "source.name": "Thenationonlineng.net" }, { "source.name": "Thisdaylive.com" }, { "source.name": "Aa.com.tr" }, { "source.name": "Pulse.ng" }, { "source.name": "Vanguardngr.com" }, { "source.name": "Naijanews.com" }, { "source.name": "Dailypost.ng" }, { "source.name": "Guardian.ng" }, { "source.name": "Tribuneonlineng.com" }, { "source.name": "Dailytrust.com.ng" }, { "source.name": "Channelstv.com" }, { "source.name": "Premiumtimesng.com" }], hiddenBy: {$nin: [userId]}}, { page: page, limit: 10, sort: { publishedAt: -1 } })
                    .then(article => {
                        res.send(article);
                    }).catch(err => {
                        res.status(500).send({
                            error: err.message || "Some error occurred while retrieving Articles."
                        });
                    });
                }
                else {
                    Article.paginate({$or: [{ "source.name": "Thenationonlineng.net" }, { "source.name": "Thisdaylive.com" }, { "source.name": "Aa.com.tr" }, { "source.name": "Pulse.ng" }, { "source.name": "Vanguardngr.com" }, { "source.name": "Naijanews.com" }, { "source.name": "Dailypost.ng" }, { "source.name": "Guardian.ng" }, { "source.name": "Tribuneonlineng.com" }, { "source.name": "Dailytrust.com.ng" }, { "source.name": "Channelstv.com" }, { "source.name": "Premiumtimesng.com" }]}, { page: page, limit: 10, sort: { publishedAt: -1 } })
                    .then(article => {
                        res.send(article);
                    }).catch(err => {
                        res.status(500).send({
                            error: err.message || "Some error occurred while retrieving Articles."
                        });
                    });
                }
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
            if (userId) {
                // If an error occurs get articles from db instead
                Article.paginate({$or: [{ "source.name": "Thenationonlineng.net" }, { "source.name": "Thisdaylive.com" }, { "source.name": "Aa.com.tr" }, { "source.name": "Pulse.ng" }, { "source.name": "Vanguardngr.com" }, { "source.name": "Naijanews.com" }, { "source.name": "Dailypost.ng" }, { "source.name": "Guardian.ng" }, { "source.name": "Tribuneonlineng.com" }, { "source.name": "Dailytrust.com.ng" }, {"source.name": "Reuters"}, { "source.name": "Channelstv.com" }, { "source.name": "Premiumtimesng.com" }], hiddenBy: {$nin: [userId]}}, { page: page, limit: 10, sort: { publishedAt: -1 } })
                .then(article => {
                    res.send(article);
                }).catch(err => {
                    res.status(500).send({
                        error: err.message || "Some error occurred while retrieving Articles."
                    });
                });
            }
            else {
                Article.paginate({$or: [{ "source.name": "Thenationonlineng.net" }, { "source.name": "Thisdaylive.com" }, { "source.name": "Aa.com.tr" }, { "source.name": "Pulse.ng" }, { "source.name": "Vanguardngr.com" }, { "source.name": "Naijanews.com" }, { "source.name": "Dailypost.ng" }, { "source.name": "Guardian.ng" }, { "source.name": "Tribuneonlineng.com" }, { "source.name": "Dailytrust.com.ng" }, { "source.name": "Channelstv.com" }, { "source.name": "Premiumtimesng.com" }]}, { page: page, limit: 10, sort: { publishedAt: -1 } })
                .then(article => {
                    res.send(article);
                }).catch(err => {
                    res.status(500).send({
                        error: err.message || "Some error occurred while retrieving Articles."
                    });
                });
            }
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

        if (userId) {
            // If an error occurs get articles from db instead
            Article.paginate({$or: [{ "source.name": "Thenationonlineng.net" }, { "source.name": "Thisdaylive.com" }, { "source.name": "Aa.com.tr" }, { "source.name": "Pulse.ng" }, { "source.name": "Vanguardngr.com" }, { "source.name": "Naijanews.com" }, { "source.name": "Dailypost.ng" }, { "source.name": "Guardian.ng" }, { "source.name": "Tribuneonlineng.com" }, { "source.name": "Dailytrust.com.ng" }, { "source.name": "Channelstv.com" }, { "source.name": "Premiumtimesng.com" }], hiddenBy: {$nin: [userId]}}, { page: page, limit: 10, sort: { publishedAt: -1 } })
            .then(article => {
                res.send(article);
            }).catch(err => {
                res.status(500).send({
                    error: err.message || "Some error occurred while retrieving Articles."
                });
            });
        }
        else {
            Article.paginate({$or: [{ "source.name": "Thenationonlineng.net" }, { "source.name": "Thisdaylive.com" }, { "source.name": "Aa.com.tr" }, { "source.name": "Pulse.ng" }, { "source.name": "Vanguardngr.com" }, { "source.name": "Naijanews.com" }, { "source.name": "Dailypost.ng" }, { "source.name": "Guardian.ng" }, { "source.name": "Tribuneonlineng.com" }, { "source.name": "Dailytrust.com.ng" }, { "source.name": "Channelstv.com" }, { "source.name": "Premiumtimesng.com" }]}, { page: page, limit: 10, sort: { publishedAt: -1 } })
            .then(article => {
                res.send(article);
            }).catch(err => {
                res.status(500).send({
                    error: err.message || "Some error occurred while retrieving Articles."
                });
            });
        }
    }
    else if (page > 1) {
        if (userId) {
            // If an error occurs get articles from db instead
            Article.paginate({$or: [{ "source.name": "Thenationonlineng.net" }, { "source.name": "Thisdaylive.com" }, { "source.name": "Aa.com.tr" }, { "source.name": "Pulse.ng" }, { "source.name": "Vanguardngr.com" }, { "source.name": "Naijanews.com" }, { "source.name": "Dailypost.ng" }, { "source.name": "Guardian.ng" }, { "source.name": "Tribuneonlineng.com" }, { "source.name": "Dailytrust.com.ng" }, { "source.name": "Channelstv.com" }, { "source.name": "Premiumtimesng.com" }], hiddenBy: {$nin: [userId]}}, { page: page, limit: 10, sort: { publishedAt: -1 } })
            .then(article => {
                res.send(article);
            }).catch(err => {
                res.status(500).send({
                    error: err.message || "Some error occurred while retrieving Articles."
                });
            });
        }
        else {
            Article.paginate({$or: [{ "source.name": "Thenationonlineng.net" }, { "source.name": "Thisdaylive.com" }, { "source.name": "Aa.com.tr" }, { "source.name": "Pulse.ng" }, { "source.name": "Vanguardngr.com" }, { "source.name": "Naijanews.com" }, { "source.name": "Dailypost.ng" }, { "source.name": "Guardian.ng" }, { "source.name": "Tribuneonlineng.com" }, { "source.name": "Dailytrust.com.ng" }, { "source.name": "Channelstv.com" }, { "source.name": "Premiumtimesng.com" }]}, { page: page, limit: 10, sort: { publishedAt: -1 } })
            .then(article => {
                res.send(article);
            }).catch(err => {
                res.status(500).send({
                    error: err.message || "Some error occurred while retrieving Articles."
                });
            });
        }
    }
};

exports.findSavedArticles = (req, res) => {
    // Validate the request
    if (!req.query.userId) {
        return res.status(400).send({
            error: "userId cannot be empty"
        })
    } 

    Article.paginate({"savedBy.userId": req.query.userId, hiddenBy: {$nin: [req.query.userId]}}, { page: req.query.page, limit: 10, sort: { 'savedBy.dateSaved': 'desc' }})
    .then(article => {
        res.send(article);
    }).catch(err => {
        res.status(500).send({
            error: err.message || "Some error occurred while retrieving Saved Articles."
        });
    });
}

exports.saveUserInArticle = (req, res) => {

    // Validate the request
    if (!req.body.userId) {
        return res.status(400).send({
            error: "userId cannot be empty"
        })
    } 

    if (!req.body.articleId) {
        return res.status(400).send({
            error: "articleId cannot be empty"
        })
    } 

    let articleId = req.body.articleId;
    let userId = req.body.userId;

    Article.findByIdAndUpdate(articleId, {
        "$push": { "savedBy": {"userId": userId, dateSaved: Date.now()} }
    }, {new: true})
    .then(article => {
        if(!article) {
            return res.status(404).send({
                error: "Article not found with id " + req.body.articleId
            });
        }
        res.send(articleId);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                error: "Article not found with id " + req.body.articleId
            });                
        }
        return res.status(500).send({
            error: err.message
        });
    });
}

exports.deleteUserFromArticle = (req, res) => {
    // Validate the request
    if (!req.body.userId) {
        return res.status(400).send({
            error: "userId cannot be empty"
        })
    } 

    if (!req.body.articleId) {
        return res.status(400).send({
            error: "articleId cannot be empty"
        })
    } 

    let articleId = req.body.articleId;
    let userId = req.body.userId;

    Article.findByIdAndUpdate(articleId, {
        "$pull": { "savedBy": {userId: userId} } 
    }, {new: true})
    .then(article => {
        if(!article) {
            return res.status(404).send({
                error: "Article not found with id " + req.body.articleId
            });
        }
        res.send(articleId);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                error: "Article not found with id " + req.body.articleId
            });                
        }
        return res.status(500).send({
            error: "Error updating Article with id " + req.body.articleId
        });
    });
}

exports.findHiddenSources = (req, res) => {
    // Validate the request
    if (!req.query.userId) {
        return res.status(400).send({
            error: "userId cannot be empty"
        })
    } 

    Article.find({"hiddenBy": {$in: [req.query.userId]}}).distinct('source.name')
    .then(article => {
        res.send(article);
    }).catch(err => {
        res.status(500).send({
            error: err.message || "Some error occurred while retrieving hidden sources."
        });
    });
}

exports.hideArticleFromUser = (req, res) => {
    // Validate the request
    if (!req.body.userId) {
        return res.status(400).send({
            error: "userId cannot be empty"
        })
    } 

    if (!req.body.sourceName) {
        return res.status(400).send({
            error: "sourceName cannot be empty"
        })
    } 

    let sourceName = req.body.sourceName;
    let userId = req.body.userId;

    Article.updateMany({"source.name": sourceName}, {
        "$push": { "hiddenBy": userId}
    })
    .then(article => {
        if(!article) {
            return res.status(404).send({
                error: "Article not found with sourceName"
            });
        }
        res.send(sourceName);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                error: "Article not found with sourceName "
            });                
        }
        return res.status(500).send({
            error: err.message
        });
    });
}

exports.deleteHiddenArticleByUser = (req, res) => {
    // Validate the request
    if (!req.body.userId) {
        return res.status(400).send({
            error: "userId cannot be empty"
        })
    } 

    if (!req.body.sourceName) {
        return res.status(400).send({
            error: "articleId cannot be empty"
        })
    } 

    let sourceName = req.body.sourceName;
    let userId = req.body.userId;

    Article.updateMany({"source.name": sourceName}, {
        "$pull": { "hiddenBy": userId}
    }, {new: true})
    .then(article => {
        if(!article) {
            return res.status(404).send({
                error: "Article not found with id " + req.body.articleId
            });
        }
        res.send("successfully undone");
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                error: "Article not found with id " + req.body.articleId
            });                
        }
        return res.status(500).send({
            error: "Error updating Article with id " + req.body.articleId
        });
    });
}

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
    const userId = req.query.userId;

    if (page == 1) {
        // Code to get articles from api
        const getArticles = async () => {
            try {
                return await axios({url: `https://newsapi.org/v2/top-headlines?apiKey=c9eb75a0e19345ccb50fe95a6d25a8af&q=${searchString}&country=${country}&category=health&pageSize=100`, method: 'get'});
            } catch(error) {

                if (userId) {
                    // If an error occurs get articles from db instead
                    Article.paginate({$text: {$search: searchString}, country: country, hiddenBy: {$nin: [userId]}}, { page: page, limit: 10, /*sort: { publishedAt: -1 }*/ })
                    .then(article => {
                        res.send(article);
                    }).catch(err => {
                        res.status(500).send({
                            error: err.message || "Some error occurred while retrieving Articles."
                        });
                    });
                }
                else {
                    // If an error occurs get articles from db instead
                    Article.paginate({$text: {$search: searchString}, country: country}, { page: page, limit: 10, /*sort: { publishedAt: -1 }*/ })
                    .then(article => {
                        res.send(article);
                    }).catch(err => {
                        res.status(500).send({
                            error: err.message || "Some error occurred while retrieving Articles."
                        });
                    });
                }
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
            if (userId) {
                // If an error occurs get articles from db instead
                Article.paginate({$text: {$search: searchString}, country: country, hiddenBy: {$nin: [userId]}}, { page: page, limit: 10, /*sort: { publishedAt: -1 }*/ })
                .then(article => {
                    res.send(article);
                }).catch(err => {
                    res.status(500).send({
                        error: err.message || "Some error occurred while retrieving Articles."
                    });
                });
            }
            else {
                // If an error occurs get articles from db instead
                Article.paginate({$text: {$search: searchString}, country: country}, { page: page, limit: 10, /*sort: { publishedAt: -1 }*/ })
                .then(article => {
                    res.send(article);
                }).catch(err => {
                    res.status(500).send({
                        error: err.message || "Some error occurred while retrieving Articles."
                    });
                });
            }
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

       if (userId) {
            // If an error occurs get articles from db instead
            Article.paginate({$text: {$search: searchString}, country: country, hiddenBy: {$nin: [userId]}}, { page: page, limit: 10, /*sort: { publishedAt: -1 }*/ })
            .then(article => {
                res.send(article);
            }).catch(err => {
                res.status(500).send({
                    error: err.message || "Some error occurred while retrieving Articles."
                });
            });
        }
        else {
            // If an error occurs get articles from db instead
            Article.paginate({$text: {$search: searchString}, country: country}, { page: page, limit: 10, /*sort: { publishedAt: -1 }*/ })
            .then(article => {
                res.send(article);
            }).catch(err => {
                res.status(500).send({
                    error: err.message || "Some error occurred while retrieving Articles."
                });
            });
        }
    }
    else if (page > 1) {
        if (userId) {
            // If an error occurs get articles from db instead
            Article.paginate({$text: {$search: searchString}, country: country, hiddenBy: {$nin: [userId]}}, { page: page, limit: 10, /*sort: { publishedAt: -1 }*/ })
            .then(article => {
                res.send(article);
            }).catch(err => {
                res.status(500).send({
                    error: err.message || "Some error occurred while retrieving Articles."
                });
            });
        }
        else {
            // If an error occurs get articles from db instead
            Article.paginate({$text: {$search: searchString}, country: country}, { page: page, limit: 10, /*sort: { publishedAt: -1 }*/ })
            .then(article => {
                res.send(article);
            }).catch(err => {
                res.status(500).send({
                    error: err.message || "Some error occurred while retrieving Articles."
                });
            });
        }
    }


}

// Find a single article with a articleId
exports.findOne = (req, res) => {
    Article.findById(req.query.articleId)
    .then(article => {
        if(!article) {
            return res.status(404).send({
                error: "Article not found"
            });            
        }
        res.send(article);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                error: "Article not found"
            });                
        }
        return res.status(500).send({
            error: "Error retrieving article. Please check your network connection"
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
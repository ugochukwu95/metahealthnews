const Comment = require('../models/comments.model.js');

function escapeHtml(text) {
  var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };

  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

exports.create = (req, res) => {
	// Validate request
	if (!req.body.userId) {
		return res.status(400).send({
			error: "userId cannot be empty"
		})
	}

	if (!req.body.comment) {
		return res.status(400).send({
			error: "comment cannot be empty"
		})
	}

	if (!req.body.articleId) {
		return res.status(400).send({
			error: "articleId cannot be empty"
		})
	}

	// create a comment
	const comment = new Comment({
		comment: escapeHtml(req.body.comment),
		author: escapeHtml(req.body.author),
		userId: req.body.userId,
		articleId: req.body.articleId
	})

	// Save comment in the database
	comment.save()
	.then(data => {
		res.send(data);
	}).catch(err => {
        res.status(500).send({
            error: err.message || "Some error occurred while creating the Comment."
        });
    });
}

exports.findAll = (req, res) => {
	if (!req.query.articleId) {
		return res.status(400).send({
			error: "articleId cannot be empty"
		})
	}

	let page = req.query.page || 1;

	Comment.paginate({articleId: req.query.articleId}, { page: page, limit: 10, sort: { publishedAt: -1 } })
    .then(comment => {
        res.send(comment);
    }).catch(err => {
        res.status(500).send({
            error: err.message || "Some error occurred while retrieving comments."
        });
    });
}

exports.update = (req, res) => {

	// Validate request
	if (!req.body.comment) {
		return res.status(400).send({
			error: "comment cannot be empty"
		})
	}

	if (!req.body.commentId) {
		return res.status(400).send({
			error: "commentId cannot be empty"
		})
	}

	// Find Comment and update it with the request body
    Comment.findByIdAndUpdate(req.body.commentId, {
        comment: escapeHtml(req.body.comment)
    }, {new: true})
    .then(comment => {
        if(!comment) {
            return res.status(404).send({
                error: "Comment not found"
            });
        }
        res.send(comment);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                error: "Article not found"
            });                
        }
        return res.status(500).send({
            error: "Error updating Comment"
        });
    });
}

exports.deleteComment = (req, res) => {
	// Validate request
	if (!req.body.commentId) {
		return res.status(400).send({
			error: "commentId cannot be empty"
		})
	}

	Comment.findByIdAndRemove(req.body.commentId)
	.then(comment => {
		if (!comment) {
			return res.status(404).send({
                error: "Comment not found"
            });
		}

		res.send(req.body.commentId);
	}).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                error: "Comment not found"
            });                
        }
        return res.status(500).send({
            error: "Could not delete comment"
        });
    });
}

exports.like = (req, res) => {
	// Validate request
	if (!req.body.userId) {
		return res.status(400).send({
			error: "userId cannot be empty"
		})
	}

	if (!req.body.commentId) {
		return res.status(400).send({
			error: "commentId cannot be empty"
		})
	}

	Comment.findByIdAndUpdate(commentId, {
		"$push": {"likes": req.body.userId}
	}, {new: true})
	.then(comment => {
        if(!comment) {
            return res.status(404).send({
                error: "Comment not found with"
            });
        }
        res.send(commentId);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                error: "Comment not found"
            });                
        }
        return res.status(500).send({
            error: err.message
        });
    });
}

exports.deleteLikeComment = (req, res) => {
	// Validate request
	if (!req.body.userId) {
		return res.status(400).send({
			error: "userId cannot be empty"
		})
	}

	if (!req.body.commentId) {
		return res.status(400).send({
			error: "commentId cannot be empty"
		})
	}

	Comment.findByIdAndUpdate(commentId, {
		"$pull": {"likes": req.body.userId}
	}, {new: true})
	.then(comment => {
        if(!comment) {
            return res.status(404).send({
                error: "Comment not found with"
            });
        }
        res.send(userId);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                error: "Comment not found"
            });                
        }
        return res.status(500).send({
            error: err.message
        });
    });
}

exports.dislike = (req, res) => {
	// Validate request
	if (!req.body.userId) {
		return res.status(400).send({
			error: "userId cannot be empty"
		})
	}

	if (!req.body.commentId) {
		return res.status(400).send({
			error: "commentId cannot be empty"
		})
	}

	Comment.findByIdAndUpdate(commentId, {
		"$push": {"dislikes": req.body.userId}
	}, {new: true})
	.then(comment => {
        if(!comment) {
            return res.status(404).send({
                error: "Comment not found with"
            });
        }
        res.send(commentId);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                error: "Comment not found"
            });                
        }
        return res.status(500).send({
            error: err.message
        });
    });
}

exports.deleteDislikedComment = (req, res) => {
	// Validate request
	if (!req.body.userId) {
		return res.status(400).send({
			error: "userId cannot be empty"
		})
	}

	if (!req.body.commentId) {
		return res.status(400).send({
			error: "commentId cannot be empty"
		})
	}

	Comment.findByIdAndUpdate(commentId, {
		"$pull": {"dislikes": req.body.userId}
	}, {new: true})
	.then(comment => {
        if(!comment) {
            return res.status(404).send({
                error: "Comment not found with"
            });
        }
        res.send(userId);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                error: "Comment not found"
            });                
        }
        return res.status(500).send({
            error: err.message
        });
    });
}
const Reply = require('../models/replies.model.js');

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

	if (!req.body.reply) {
		return res.status(400).send({
			error: "reply cannot be empty"
		})
	}

    if (!req.body.commentId) {
        return res.status(400).send({
            error: "commentId cannot be empty"
        })
    }

	// create a reply
	const reply = new Reply({
		reply: escapeHtml(req.body.reply),
		author: escapeHtml(req.body.author),
		userId: req.body.userId,
        commentId: req.body.commentId
	})

	// Save reply in the database
	reply.save()
	.then(data => {
		res.send(data);
	}).catch(err => {
        res.status(500).send({
            error: err.message || "Some error occurred while creating the Reply."
        });
    });
}

exports.findAll = (req, res) => {
    if (!req.body.commentId) {
        return res.status(400).send({
            error: "commentId cannot be empty"
        })
    }

	let page = req.query.page || 1;

	Reply.paginate({commentId: req.body.commentId}, { page: page, limit: 10, sort: { publishedAt: -1 } })
    .then(comment => {
        res.send(comment);
    }).catch(err => {
        res.status(500).send({
            error: err.message || "Some error occurred while retrieving comments."
        });
    });
}

exports.updateReply = (req, res) => {

	// Validate request
	if (!req.body.reply) {
		return res.status(400).send({
			error: "reply cannot be empty"
		})
	}

	if (!req.body.replyId) {
		return res.status(400).send({
			error: "replyId cannot be empty"
		})
	}

	// Find Reply and update it with the request body
    Reply.findByIdAndUpdate(req.body.replyId, {
        reply: escapeHtml(req.body.reply)
    }, {new: true})
    .then(comment => {
        if(!comment) {
            return res.status(404).send({
                error: "Reply not found"
            });
        }
        res.send(reply);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                error: "Reply not found"
            });                
        }
        return res.status(500).send({
            error: "Error updating Reply"
        });
    });
}

exports.deleteReply = (req, res) => {
	// Validate request
	if (!req.body.replyId) {
		return res.status(400).send({
			error: "replyId cannot be empty"
		})
	}

	Reply.findByIdAndRemove(req.body.replyId)
	.then(comment => {
		if (!comment) {
			return res.status(404).send({
                error: "Reply not found"
            });
		}

		res.send({message: "Reply deleted successfully!"});
	}).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                error: "Reply not found"
            });                
        }
        return res.status(500).send({
            error: "Could not delete reply"
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

	if (!req.body.replyId) {
		return res.status(400).send({
			error: "replyId cannot be empty"
		})
	}

	Reply.findByIdAndUpdate(replyId, {
		"$push": {"likes": req.body.userId}
	}, {new: true})
	.then(comment => {
        if(!comment) {
            return res.status(404).send({
                error: "Reply not found with"
            });
        }
        res.send(replyId);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                error: "Reply not found"
            });                
        }
        return res.status(500).send({
            error: err.message
        });
    });
}

exports.deleteLikeReply = (req, res) => {
	// Validate request
	if (!req.body.userId) {
		return res.status(400).send({
			error: "userId cannot be empty"
		})
	}

	if (!req.body.replyId) {
		return res.status(400).send({
			error: "replyId cannot be empty"
		})
	}

	Reply.findByIdAndUpdate(replyId, {
		"$pull": {"likes": req.body.userId}
	}, {new: true})
	.then(comment => {
        if(!comment) {
            return res.status(404).send({
                error: "Reply not found with"
            });
        }
        res.send(replyId);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                error: "Reply not found"
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

	if (!req.body.replyId) {
		return res.status(400).send({
			error: "replyId cannot be empty"
		})
	}

	Reply.findByIdAndUpdate(replyId, {
		"$push": {"dislikes": req.body.userId}
	}, {new: true})
	.then(comment => {
        if(!comment) {
            return res.status(404).send({
                error: "Reply not found with"
            });
        }
        res.send(replyId);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                error: "Reply not found"
            });                
        }
        return res.status(500).send({
            error: err.message
        });
    });
}

exports.deleteDislikedReply = (req, res) => {
	// Validate request
	if (!req.body.userId) {
		return res.status(400).send({
			error: "userId cannot be empty"
		})
	}

	if (!req.body.replyId) {
		return res.status(400).send({
			error: "replyId cannot be empty"
		})
	}

	Reply.findByIdAndUpdate(replyId, {
		"$pull": {"dislikes": req.body.userId}
	}, {new: true})
	.then(comment => {
        if(!comment) {
            return res.status(404).send({
                error: "Reply not found with"
            });
        }
        res.send(replyId);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                error: "Reply not found"
            });                
        }
        return res.status(500).send({
            error: err.message
        });
    });
}
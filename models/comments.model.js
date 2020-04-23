const mongoose = require('mongoose');
// const SchemaTypes = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const CommentsSchema = mongoose.Schema({
	comment: {
		type: String,
		required: true
	},
	author: {
		type: String,
		required: true
	},
	userId: {
		type: String,
		required: true
	},
	articleId: {
		type: String,
		required: true
	},
	publishedAt: {
		type: Date, 
        default: Date.now
	},
	likes: {
		type: [String],
	},
	dislikes: {
		type: [String]
	}
});

// Give schema pagination capabilities
CommentsSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Comment', CommentsSchema);
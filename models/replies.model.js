const mongoose = require('mongoose');
// const SchemaTypes = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const RepliesSchema = mongoose.Schema({
	reply: {
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
	commentId: {
		type: String,
		required: true,
		index: true
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
RepliesSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Reply', RepliesSchema);
const mongoose = require('mongoose');
const SchemaTypes = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const ArticleSchema = mongoose.Schema({
	source: {
        type: SchemaTypes.Types.Mixed,
    },
	author: {
        type: String,
    },
    title: {
    	type: String,
        index: true,
        unique: true
    },
    description: {
        type: String,
    },
    url: {
        type: String,
    },
    urlToImage: {
        type: String,
        required: true
    },
    publishedAt: { 
        type: Date, 
        index: true,
        default: Date.now 
    },
    country: {
        type: String,
        index: true
    },
    content: {
        type: String
    }
});

// Give schema pagination capabilities
ArticleSchema.plugin(mongoosePaginate);

// add a text index to schema
ArticleSchema.index({ description: 'text', url: 'text' });

module.exports = mongoose.model('Article', ArticleSchema);
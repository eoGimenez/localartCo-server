const { Schema, model } = require('mongoose');

const postSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		contract: {
			type: String,
			enum: [
				'Total batch in concession',
				'Percentages to arrenge',
				'Would like to sale by unit',
			],
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		batch: {
			type: Number,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		category: {
			type: String,
			enum: ['Natural Cosmetics', 'Home Deco', 'Misellaneous', 'Fabric & Fashion'],
			required: true,
		},
		available: {
			type: Boolean,
			default: true
		},
		author: { type: Schema.Types.ObjectId, ref: 'User' },
	},
	{
		timestamps: true,
	}
);

const Post = model('Post', postSchema);

module.exports = Post;

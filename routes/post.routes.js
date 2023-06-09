const express = require('express');
const router = express.Router();
const Post = require('../models/Post.model');
const User = require('../models/User.model');
const fileUploader = require('../config/cloudinary.config');
const { isAuthenticated } = require('../middleware/jwt.middleware');
// const isArtisan = require('../middleware/isArtisan');

router.get('/', isAuthenticated, (req, res, next) => {
	Post.find()
		.populate('author')
		.then((result) => {
			res.json(result);
		})
		.catch((err) => next(err));
});

router.post(
	'/',
	isAuthenticated,
	/* isArtisan, */ (req, res, next) => {
		const { title, contract, image, description, batch, price, category, available, author } =
			req.body;
		Post.create({
			title,
			contract,
			image,
			description,
			batch,
			price,
			category,
			author,
		})
			.then((result) => {
				return User.findByIdAndUpdate(author, {
					$push: { posts: result._id },
				});
			})
			.then((result) => res.status(201).json({ result: 'Created !', post: result }))
			.catch((err) => next(err));
	}
);

router.get('/:postId', isAuthenticated, (req, res, next) => {
	const { postId } = req.params;
	Post.findById(postId)
		.populate('author')
		.then((result) => {
			res.status(200).json(result);
		})
		.catch((err) => next(err));
});

router.put(
	'/:postId',
	isAuthenticated,
	/* isArtisan, */ (req, res, next) => {
		const { title, contract, image, description, batch, price, category, available } = req.body;
		const { postId } = req.params;
		Post.findByIdAndUpdate(
			postId,
			{ title, contract, image, description, batch, price, category, available },
			{ new: true }
		)
			.then((result) => {
				res.status(200).json({ result });
			})
			.catch((err) => next(err));
	}
);

router.delete(
	'/:postId',
	isAuthenticated,
	/* isArtisan, */ (req, res, next) => {
		const { postId } = req.params;
		Post.findByIdAndDelete(postId)
			.then((result) => {
				return User.findByIdAndUpdate(result.author, { $pull: { posts: result._id } }).then(
					(result) => {
						res.status(202).json({ message: `Post was deleted` });
					}
				);
			})
			.catch((err) => next(err));
	}
);

router.post('/upload', fileUploader.single('image'), isAuthenticated, (req, res, next) => {
	if (!req.file) {
		next(new Error('No file uploaded!'));
		return;
	}
	res.json({ fileUrl: req.file.path });
});

module.exports = router;

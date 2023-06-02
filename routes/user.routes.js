const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
const fileUploader = require('../config/cloudinary.config');
const { isAuthenticated } = require('../middleware/jwt.middleware');
const bcrypt = require('bcrypt');

const saltRounds = 10;

router.get('/', isAuthenticated, (req, res, next) => {
	User.find()
		.then((response) => {
			res.json(response);
		})
		.catch((err) => next(err));
});

router.get('/:userId', isAuthenticated, (req, res, next) => {
	const { userId } = req.params;

	User.findById(userId)
		.populate('posts')
		.then((result) => {
			res.json(result);
		})
		.catch((err) => next(err));
});

router.put('/:id', isAuthenticated, (req, res, next) => {
	const { id } = req.params;
	const { email, password, passwordRe, name, surname, cif, avatar } = req.body;

	if (
		email === '' ||
		password === '' ||
		passwordRe === '' ||
		name === '' ||
		surname === '' ||
		cif === ''
	) {
		res.status(400).json({ message: 'Please, compleate the mandaroty field' });
		return;
	}

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
	if (!emailRegex.test(email)) {
		res.status(400).json({ message: 'Provide a valid email address.' });
		return;
	}

	if (password !== undefined) {
		const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
		if (!passwordRegex.test(password)) {
			res.status(400).json({
				message:
					'Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.',
			});
			return;
		}
	}

	const salt = bcrypt.genSaltSync(saltRounds);
	const hashedPassword = bcrypt.hashSync(password, salt);

	User.findByIdAndUpdate(
		id,
		{ email, password: hashedPassword, name, surname, cif, avatar },
		{ new: true }
	)
		.then((result) => {
			res.json(result);
		})
		.catch((err) => next(err));
});

router.put('/:id/commerce', isAuthenticated, (req, res, next) => {
	const { id } = req.params;
	const { commercename, location, aboutme } = req.body;

	if (commercename === '' || location === '' || aboutme === '') {
		res.status(400).json({ message: 'Please, compleate the mandaroty field' });
		return;
	}
	User.findByIdAndUpdate(id, { commercename, location, aboutme }, { new: true })
		.then((result) => {
			res.json(result);
		})
		.catch((err) => next(err));
});

// router.put('/:userId/edit/chatsId', isAuthenticated, (req, res, next) => {
// 	const { chatId } = req.body;
// 	const { userId } = req.params;
// 	const chatsId = chatId;
// 	User.findOne({ chatsId });

// 	User.findByIdAndUpdate(userId, { $push: { chatsId } })
// 		.then((result) => res.json(result.data))
// 		.catch((err) => next(err));
// });

router.delete('/:id', isAuthenticated, (req, res, next) => {
	const { id } = req.params;
	User.findByIdAndDelete(id)
		.then((response) => {
			res.json({ response: 'ok' });
		})

		.catch((err) => next(err));
});

router.post('/upload', fileUploader.single('avatar'), isAuthenticated, (req, res, next) => {
	if (!req.file) {
		next(new Error('No file uploaded!'));
		return;
	}

	res.json({ fileUrl: req.file.path });
});

module.exports = router;

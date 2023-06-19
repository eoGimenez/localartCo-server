const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const FRONTEND_URL = process.env.ORIGIN;
const FRONTEND_LOCAL = process.env.ORIGIN_LOCAL;

module.exports = (app) => {
	app.set('trust proxy', 1);

	app.use(
		cors({
			credentials: true,
			origin: [FRONTEND_URL, FRONTEND_LOCAL],
		})
	);

	app.use(logger('dev'));

	app.use(express.json());
	app.use(express.urlencoded({ extended: false }));
	app.use(cookieParser());
};

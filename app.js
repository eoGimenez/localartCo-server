require('dotenv').config();
require('./db');

const express = require('express');

const app = express();

require('./config')(app);

const userRoutes = require('./routes/user.routes');
app.use('/api/user', userRoutes);

const postRoutes = require('./routes/post.routes');
app.use('/api/post', postRoutes);

const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

require('./error-handling')(app);

module.exports = app;

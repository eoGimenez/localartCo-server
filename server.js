const app = require('./app').default;

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`);
});

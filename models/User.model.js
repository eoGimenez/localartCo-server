const { Schema, model } = require('mongoose');

const userSchema = new Schema(
	{
		email: {
			type: String,
			required: [true, 'Email is required.'],
			unique: true,
			trim: true,
		},
		password: {
			type: String,
			required: [true, 'Password is required.'],
		},
		name: {
			type: String,
			required: [true, 'Name is required.'],
		},
		surname: {
			type: String,
			required: [true, 'Surname is required.'],
		},
		commerceName: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			required: true,
			enum: ['Artisan', 'Commerce', 'Admin'],
		},
		cif: {
			type: String,
			required: true,
			unique: true,
		},
		avatar: {
			type: String,
			default:
				'https://res.cloudinary.com/dbld4vcec/image/upload/v1686934914/iheb-ab-OBufvGMaBaQ-unsplash_l8bccf.jpg',
		},
		aboutme: String,
		location: String,
		posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
	},
	{
		timestamps: true,
	}
);

const User = model('User', userSchema);

module.exports = User;

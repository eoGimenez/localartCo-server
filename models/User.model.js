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
		commercename: {
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
				'https://res.cloudinary.com/dlkwvyopo/image/upload/v1678864779/emptyavatar_wnfas4.png',
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

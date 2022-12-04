import {UserModel} from '../models/User.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export const login = async (req, res) => {
	try {
		const {userName, password} = req.body;
		const user = await UserModel.findOne({userName});
		if (!user) {
			res.status(401).json('User not found');
		} else {
			if (user.password == password) {
				const data = {userName: req.body.userName};
				const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
					expiresIn: '1h',
				});
				res.status(200).json({accessToken});
			} else {
				res.status(401).json('Password is incorrect');
			}
		}
	} catch (err) {
		console.log(err);
		res.status(500).json('Internal Error Server');
	}
};

import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export function validateAccessToken(req, res, next) {
	let accessToken = req.headers['authorization'];
	console.log(accessToken);
	accessToken = accessToken.split(' ')[1];
	if (!accessToken) res.status(401).json('AccessToken is invalid');
	jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
		console.log(err);
		if (err) res.status(403).json('Not Permission');
		next();
	});
}

import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export function validateAccessToken(req, res, next) {
  let accessToken = req.headers['authorization'];
  if (!accessToken) res.status(403).json({ message: 'AccessToken is invalid' });
  accessToken = accessToken.split(' ')[1];
  console.log('accessToken', accessToken);
  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    if (err) {
      res.status(403).json({ message: 'Invalid Permission' });
      return;
    }
    next();
  });
}

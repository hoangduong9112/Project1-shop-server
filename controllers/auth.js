import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (userName === 'duong' && password === '123') {
      const data = { userName: req.body.userName };
      const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '4h',
      });
      res.status(200).json({ accessToken });
    } else {
      res.status(401).json('Invalid account');
    }
  } catch (err) {
    res.status(500).json('Internal Error Server');
  }
};

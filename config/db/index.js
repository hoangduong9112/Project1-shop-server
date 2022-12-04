import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

async function connect() {
	try {
		await mongoose.connect(process.env.DATABASE_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('Connect Successfully to db');
	} catch (error) {
		console.log('Connect Failure');
	}
}

export default {connect};

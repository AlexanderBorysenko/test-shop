import dotenv from 'dotenv';
import { existsSync } from 'fs';

dotenv.config({
	debug: process.env.NODE_ENV !== 'production',
	path: existsSync(`./.env.${process.env.NODE_ENV}`)
		? `./.env.${process.env.NODE_ENV}`
		: './.env'
});

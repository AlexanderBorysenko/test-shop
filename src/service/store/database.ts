import mysql from 'mysql';
import util from 'util';
import '../../../env';

export const dbConnection = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	connectTimeout: 0
});

//some magic to make async/await work with mysql
export const dbQuery = util.promisify(dbConnection.query).bind(dbConnection);

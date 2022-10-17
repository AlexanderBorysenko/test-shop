import mysql from 'mysql';
import util from 'util';

// Database structure:
// Table: products
// Columns: id, name, price, description, image (url), category (id of category)
// Table: categories
// Columns: id, name, parent (id of parent category)
// Table: clients
// Columns: id, cart (JSON)

export const dbConnection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'tg-bot-shop'
});

//some magic to make async/await work with mysql
export const dbQuery = util.promisify(dbConnection.query).bind(dbConnection);

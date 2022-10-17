import mysql, { Query, QueryFunction } from 'mysql';
import util from 'util';
import '../../../env';
// Database structure:
// Table: products
// Columns: id, name, price, description, image (url), category (id of category)
// Table: categories
// Columns: id, name, parent (id of parent category)
// Table: clients
// Columns: id, cart (JSON)

export const dbQuery = <T>(queryString: string) => {
	return new Promise<T[]>((resolve, reject) => {
		const dbConnection = mysql.createConnection({
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
			connectTimeout: 0
		});

		dbConnection.query(queryString, (error, results: T[]) => {
			if (error) {
				reject([]);
			}
			resolve(results);
		});

		dbConnection.end();
	});
};

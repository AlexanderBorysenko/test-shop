import { DbQuery } from 'src/customTypes/db';
import { IProduct } from 'src/customTypes/product';

export class ProductsStore {
	constructor(private readonly dbQuery: DbQuery) {}
	async getProductsByCategory(category: number | number[]) {
		try {
			let categoryQueryString = `${category}`;
			if (Array.isArray(category)) {
				categoryQueryString = category.join(',');
			}
			const products = await this.dbQuery(
				`SELECT * FROM products WHERE category IN (${categoryQueryString})`
			);

			return products.map((product: IProduct) => ({ ...product }));
		} catch (err) {
			console.log(err);
			return [];
		}
	}

	async getProductById(id: number) {
		try {
			const products: IProduct[] = await this.dbQuery(
				`SELECT * FROM products WHERE id = ${id}`
			);
			if (products.length === 0) return null;
			return products[0];
		} catch (err) {
			console.log(err);
			return null;
		}
	}
}

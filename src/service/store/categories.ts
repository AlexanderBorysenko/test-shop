import { ICategory } from 'src/customTypes/category';
import { DbQuery } from 'src/customTypes/db';

export class CategoriesStore {
	constructor(private readonly dbQuery: DbQuery) {}

	async getCategories() {
		try {
			return await this.dbQuery<ICategory>('SELECT * FROM categories');
		} catch (err) {
			console.log(err);
			return [];
		}
	}

	async getCategoryById(id: number) {
		try {
			const result = await this.dbQuery<ICategory>(
				`SELECT * FROM categories WHERE id = ${id}`
			);
			if (result.length === 0) return null;
			return { ...result[0] };
		} catch (err) {
			console.log(err);
			return null;
		}
	}

	async getCategoriesByParentId(
		parentId: number,
		recursive: boolean = false
	) {
		try {
			const childrens: ICategory[] = [];

			const execute = async (id: number) => {
				const categories: ICategory[] = await this.dbQuery(
					`SELECT * FROM categories WHERE parent = ${id}`
				);

				categories.map(async category => {
					childrens.push(category);
					if (recursive) await execute(category.id);
				});
			};

			await execute(parentId);

			return childrens;
		} catch (err) {
			console.log(err);

			return [];
		}
	}
}

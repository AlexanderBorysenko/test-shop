import { Bot } from 'src/customTypes/bot';
import { IProduct } from 'src/customTypes/product';

export class ProductsController {
	constructor(private readonly bot: Bot) {}

	async listProducts(products: IProduct[], chatId: number) {
		products.forEach(async product => {
			try {
				await this.bot.sendPhoto(chatId, product.image, {
					caption: `${product.name} \n ${product.description} \n Ціна: ${product.price} грн`,
					reply_markup: {
						inline_keyboard: [
							[
								{
									text: 'Додати до кошика',
									callback_data: `/add_to_cart ${product.id}`
								}
							]
						]
					}
				});
			} catch (e) {
				console.log(e);
			}
		});
	}

	async listProductsByCategoryId(chatId: number, categoryId: number) {
		const categories = (
			await this.bot.store.categories.getCategoriesByParentId(categoryId)
		).map(category => category.id);
		categories.push(categoryId);

		const products = await this.bot.store.products.getProductsByCategory(
			categories
		);

		if (products.length !== 0) {
			await this.listProducts(products, chatId);
		} else {
			await this.bot.sendMessage(
				chatId,
				'В даній категорії товарів немає'
			);
		}
	}
}

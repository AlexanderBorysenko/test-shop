import { Bot } from 'src/customTypes/bot';
import { ICartProduct } from 'src/customTypes/product';

export class CartController {
	constructor(private readonly bot: Bot) {}

	async listCart(chatId: number) {
		const cartProducts = await this.bot.store.client.getClientCart(chatId);

		if (cartProducts.length === 0) {
			await this.bot.sendMessage(chatId, 'Ваш кошик порожній', {
				reply_markup: {
					keyboard: [
						[
							{
								text: 'Перегляд Товарів'
							}
						]
					]
				}
			});
		}

		cartProducts.forEach(async (product: ICartProduct) => {
			try {
				await this.bot.sendMessage(
					chatId,
					`${product.name}\n Ціна : ${
						product.price * product.count
					} грн\n Кількість : ${product.count}`,
					{
						reply_markup: {
							inline_keyboard: [
								[
									{
										text: 'Видалити з кошика',
										callback_data: `/remove_from_cart ${product.id}`
									}
								]
							]
						}
					}
				);
			} catch (e) {
				console.log(e);
			}
		});
	}
}

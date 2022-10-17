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
				const productMessage = await this.bot.sendMessage(
					chatId,
					await this.getCartProductDescription(chatId, product)
				);
				this.bot.editMessageReplyMarkup(
					{
						inline_keyboard: [
							[
								{
									text: 'Видалити з кошика',
									callback_data: `/remove_from_cart ${product.id} ${productMessage.message_id}`
								}
							]
						]
					},
					{
						chat_id: chatId,
						message_id: productMessage.message_id
					}
				);
			} catch (e) {
				console.log(e);
			}
		});
	}
	public async getCartProductDescription(
		chatId: number,
		cartProduct: ICartProduct | number
	) {
		let product: ICartProduct;
		if (typeof cartProduct === 'number') {
			product = await this.bot.store.client.getClientCartProduct(
				chatId,
				cartProduct
			);
		} else {
			product = cartProduct;
		}

		return `${product.name}\nЗагальна Ціна : ${
			product.price * product.count
		} грн\nКількість : ${product.count}`;
	}
}

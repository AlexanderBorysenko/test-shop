import { Message, ReplyListener } from 'node-telegram-bot-api';
import { Bot } from 'src/customTypes/bot';
import { IOrder } from 'src/customTypes/checkout';

export class CheckoutController {
	constructor(private bot: Bot) {}

	public async checkout(chatId: number) {
		const clientCart = await this.bot.store.client.getClientCart(chatId);
		if (clientCart.length === 0) {
			await this.bot.sendMessage(chatId, 'Ваш кошик пустий');
			return;
		}

		const clientData = {
			chat_id: chatId,
			adress: '',
			phone: '',
			name: '',
			products: clientCart
		} as IOrder;

		await this.bot.controller.userPrompt
			.getPrompt(chatId, 'Ваше ПІБ')
			.then((msg: Message) => (clientData.name = msg.text));
		await this.bot.controller.userPrompt
			.getPrompt(chatId, 'Контактний телефон')
			.then((msg: Message) => (clientData.phone = msg.text));
		await this.bot.controller.userPrompt
			.getPrompt(chatId, 'Місто на томер відділення Нової Пошти')
			.then((msg: Message) => (clientData.adress = msg.text));

		this.bot.ordersBuffer.set(chatId, clientData);
		this.bot.sendMessage(chatId, 'Підтвердіть замовлення', {
			reply_markup: {
				inline_keyboard: [
					[
						{
							text: 'Підтвердити',
							callback_data: `/confirm_order`
						},
						{
							text: 'Відмінити',
							callback_data: `/cancel_order`
						}
					]
				]
			}
		});
	}

	public async listAllClientOrders(chatId: number) {
		const orders = await this.bot.store.checkout.getOrdersByChatId(chatId);
		if (orders.length === 0) {
			await this.bot.sendMessage(chatId, 'Замовлень немає');
			return;
		}

		const ordersList = orders.map((order, index) => {
			return `${index + 1}.\nІм'я: ${order.name}\nТелефон: ${
				order.phone
			}\nАдреса доставки: ${order.adress}\n\n${order.products
				.map(
					product =>
						`Найменування: ${product.name}\nКількість: ${
							product.count
						}\nЗагальна Ціна: ${product.price * product.count} грн`
				)
				.join('\n\n')}`;
		});

		ordersList.forEach(
			async order => await this.bot.sendMessage(chatId, order)
		);
	}
}

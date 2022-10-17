import TelegramBot, { Message } from 'node-telegram-bot-api';

export class NavigationController {
	constructor(private readonly bot: TelegramBot) {}

	async wellcome(msg: Message) {
		await this.bot.sendMessage(
			msg.chat.id,
			`Вітаємо y нашому магазині, ${msg.chat.first_name}`,
			{
				reply_markup: {
					keyboard: [
						[
							{
								text: 'Перегляд Товарів'
							}
						],
						[
							{
								text: 'Кошик'
							}
						]
					]
				}
			}
		);
	}

	async goHome(chatId: number) {
		await this.bot.sendMessage(chatId, 'Ви на головный сторінці', {
			reply_markup: {
				keyboard: [
					[
						{
							text: 'Перегляд Товарів'
						}
					],
					[
						{
							text: 'Кошик'
						}
					]
				]
			}
		});
	}

	async goProducts(chatId: number) {
		await this.bot.sendMessage(chatId, 'Перегляд товарів', {
			reply_markup: {
				keyboard: [
					[
						{
							text: 'Головне Меню'
						}
					],
					[
						{
							text: 'Кошик'
						}
					]
				]
			}
		});
	}

	async goCart(chatId: number) {
		await this.bot.sendMessage(chatId, 'Ваш Кошик:', {
			reply_markup: {
				keyboard: [
					[
						{
							text: 'Оформити Замовлення'
						}
					],
					[
						{
							text: 'Головне Меню'
						}
					]
				]
			}
		});
	}

	async goToCheckout(chatId: number) {
		await this.bot.sendMessage(chatId, 'Ваш Кошик:', {
			reply_markup: {
				keyboard: [
					[
						{
							text: 'Кошик'
						}
					],
					[
						{
							text: 'Головне Меню'
						}
					]
				]
			}
		});
	}
}

import TelegramBot, { Message } from 'node-telegram-bot-api';

export class NavigationController {
	constructor(private readonly bot: TelegramBot) {}

	async wellcome(msg: Message) {
		await this.bot.sendMessage(
			msg.chat.id,
			`Вітаємо y нашому магазині, ${msg.chat.first_name}`,
			{
				reply_markup: {
					resize_keyboard: true,
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
						],
						[
							{
								text: 'Мої Замовлення'
							}
						]
					]
				}
			}
		);
	}

	async homeNavigation(chatId: number, text = 'Ви на головный сторінці') {
		await this.bot.sendMessage(chatId, text, {
			reply_markup: {
				resize_keyboard: true,
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

	async productsNavigation(chatId: number, text = 'Перегляд Товарів') {
		await this.bot.sendMessage(chatId, text, {
			reply_markup: {
				resize_keyboard: true,
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

	async cartNavigation(chatId: number, text = 'Кошик:') {
		await this.bot.sendMessage(chatId, text, {
			reply_markup: {
				resize_keyboard: true,
				keyboard: [
					[
						{
							text: 'Оформити Замовлення'
						}
					],
					[
						{
							text: 'Мої Замовлення'
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

	async checkoutNavigation(chatId: number, text = 'Оформлення Замовлення:') {
		await this.bot.sendMessage(chatId, text, {
			reply_markup: {
				resize_keyboard: true,
				keyboard: [
					[
						{
							text: 'Підтвердити Замовлення'
						}
					],
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

	async clientOrdersNavigation(chatId: number, text = 'Ваші Замовлення:') {
		await this.bot.sendMessage(chatId, text, {
			reply_markup: {
				resize_keyboard: true,
				keyboard: [
					[
						{
							text: 'Головне Меню'
						}
					]
				]
			}
		});
	}

	async afterCheckoutNavigation(
		chatId: number,
		text = "Ваше Замовлення прийнято, скоро ми з вами з'яжемось!"
	) {
		await this.bot.sendMessage(chatId, text, {
			reply_markup: {
				resize_keyboard: true,
				keyboard: [
					[
						{
							text: 'Мої Замовлення'
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

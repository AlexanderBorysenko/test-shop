import { Message, ReplyListener } from 'node-telegram-bot-api';
import { Bot } from 'src/customTypes/bot';

export class CheckoutController {
	constructor(private bot: Bot) {}

	public async getClientData(chatId: number) {
		await this.bot.controller.userPrompt.getPrompt(chatId, 'Ваше ПІБ');
		await this.bot.controller.userPrompt.getPrompt(
			chatId,
			'Контактний телефон'
		);
		await this.bot.controller.userPrompt.getPrompt(
			chatId,
			'Місто на томер відділення Нової Пошти'
		);

		await this.bot.sendMessage(chatId, 'Дякую за замовлення');
	}
}

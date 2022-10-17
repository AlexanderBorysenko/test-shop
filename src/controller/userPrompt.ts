import { Message } from 'node-telegram-bot-api';
import { Bot } from 'src/customTypes/bot';

export class ClientPromptController {
	constructor(private bot: Bot) {}

	public async getPrompt(
		chatId: number,
		message: string
		// callback?: Function
	) {
		let contentMessage = await this.bot.sendMessage(chatId, message, {
			reply_markup: {
				force_reply: true
			}
		});

		let listenerReply: any;
		listenerReply = (msg: Message) => {
			this.bot.removeReplyListener(listenerReply);

			// callback(msg);
		};

		this.bot.onReplyToMessage(
			contentMessage.chat.id,
			contentMessage.message_id,
			listenerReply
		);
	}
}

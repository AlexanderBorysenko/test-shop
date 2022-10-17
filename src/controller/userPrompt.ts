import { Message } from 'node-telegram-bot-api';
import { Bot } from 'src/customTypes/bot';

export class ClientPromptController {
	constructor(private bot: Bot) {}

	public async getPrompt(chatId: number, message: string) {
		return new Promise(async (resolve, reject) => {
			this.bot.router.pauseListening = true;

			let contentMessage = await this.bot.sendMessage(chatId, message, {
				reply_markup: {
					force_reply: true
				}
			});

			let listenerReply: any;
			listenerReply = (msg: Message) => {
				this.bot.removeReplyListener(listenerReply);

				resolve(msg);
				this.bot.router.pauseListening = false;
			};

			this.bot.onReplyToMessage(
				contentMessage.chat.id,
				contentMessage.message_id,
				listenerReply
			);
		});
	}
}

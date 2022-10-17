import TelegramBot, { CallbackQuery, Message } from 'node-telegram-bot-api';
import {
	RouterCallbackQueryHandler,
	RouterMessageHandler
} from 'src/customTypes/router';

export class Router {
	private messageRoutes = new Map();
	private callbackQueryRoutes = new Map();
	private bot: TelegramBot;
	public pauseListening: boolean = false;

	constructor(bot: TelegramBot) {
		this.bot = bot;
	}

	addMessageRoute(route: string, handler: RouterMessageHandler) {
		this.messageRoutes.set(route, handler);
	}
	addCallbackQueryRoute(route: string, handler: RouterCallbackQueryHandler) {
		this.callbackQueryRoutes.set(route, handler);
	}

	private handleMessage(msg: Message) {
		const handler = this.messageRoutes.get(msg.text);
		if (handler) handler(msg);
	}

	private handleCallbackQuery(msg: CallbackQuery) {
		this.callbackQueryRoutes.forEach((handler, key) => {
			if (msg.data.startsWith(key)) handler(msg);
		});
	}

	listenMessages() {
		this.bot.on('message', msg => {
			if (!this.pauseListening) this.handleMessage(msg);
		});
	}

	listenCallbackQuery() {
		this.bot.on('callback_query', msg => {
			if (!this.pauseListening) this.handleCallbackQuery(msg);
		});
	}
}

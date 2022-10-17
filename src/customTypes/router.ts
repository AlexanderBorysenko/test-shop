import { CallbackQuery, Message } from 'node-telegram-bot-api';

export type RouterMessageHandler = (msg: Message) => Promise<void>;
export type RouterCallbackQueryHandler = (msg: CallbackQuery) => Promise<void>;

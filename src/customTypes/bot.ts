import TelegramBot from 'node-telegram-bot-api';
import { controllerInit } from 'src/controller';
import { Router } from 'src/routes/router';
import { storeInit } from 'src/service/store';
import { IOrder } from './checkout';

export type Bot = {
	store: ReturnType<typeof storeInit>;
	controller: ReturnType<typeof controllerInit>;
	router: Router;
	ordersBuffer: Map<number, IOrder>;
} & TelegramBot;

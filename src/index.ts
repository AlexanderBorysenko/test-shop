import TelegramBot from 'node-telegram-bot-api';
import '../env';

import { controllerInit } from './controller';
import { Bot } from './customTypes/bot';
import { Router } from './routes/router';
import { storeInit } from './service/store';

const start = async () => {
	const bot = new TelegramBot(process.env.TOKEN, { polling: true }) as Bot;
	bot.store = storeInit(bot);
	bot.controller = controllerInit(bot);
	bot.router = new Router(bot);

	bot.router.addMessageRoute(
		'/start',
		async msg => await bot.controller.navigation.wellcome(msg)
	);

	bot.router.addMessageRoute(
		'Головне Меню',
		async msg => await bot.controller.navigation.goHome(msg.chat.id)
	);

	bot.router.addMessageRoute('Кошик', async msg => {
		await bot.controller.navigation.goCart(msg.chat.id);
		await bot.controller.cart.listCart(msg.chat.id);
	});

	bot.router.addMessageRoute('Перегляд Товарів', async msg => {
		await bot.controller.navigation.goProducts(msg.chat.id);
		await bot.controller.categories.listCategoriesByParentId(
			msg.chat.id,
			0
		);
	});

	bot.router.addMessageRoute('Оформити Замовлення', async msg => {
		await bot.controller.checkout.getClientData(msg.chat.id);
	});

	bot.router.listenMessages();

	bot.router.addCallbackQueryRoute('/select_category', async msg => {
		await bot.controller.categories.listCategoriesByParentId(
			msg.message.chat.id,
			+msg.data.split(' ')[1]
		);
	});

	bot.router.addCallbackQueryRoute('/add_to_cart', async msg => {
		const productId = +msg.data.split(' ')[1];
		await bot.store.client.addProductToCart(msg.message.chat.id, productId);
		await bot.sendMessage(msg.message.chat.id, `Товар додано в кошик`);
	});

	bot.router.addCallbackQueryRoute('/remove_from_cart', async msg => {
		const productId = +msg.data.split(' ')[1];
		await bot.store.client.removeProductFromCart(
			msg.message.chat.id,
			productId
		);
		await bot.sendMessage(msg.message.chat.id, `Товар видалено з кошика`);
	});

	bot.router.listenCallbackQuery();
};

start();

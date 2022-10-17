import { Bot } from 'src/customTypes/bot';
import { CartController } from './cart';
import { CategoryController } from './category';
import { CheckoutController } from './checkout';
import { NavigationController } from './navigation';
import { ProductsController } from './product';
import { ClientPromptController } from './userPrompt';

export const controllerInit = (bot: Bot) => {
	return {
		navigation: new NavigationController(bot),
		categories: new CategoryController(bot),
		products: new ProductsController(bot),
		cart: new CartController(bot),
		checkout: new CheckoutController(bot),
		userPrompt: new ClientPromptController(bot)
	};
};

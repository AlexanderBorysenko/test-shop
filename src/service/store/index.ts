import { DbQuery } from 'src/customTypes/db';
import { Client } from './client';
import { CategoriesStore } from './categories';
import { dbQuery } from './database';
import { ProductsStore } from './product';
import { Bot } from 'src/customTypes/bot';
import { CheckoutService } from './checkout';

export const storeInit = (bot: Bot, db: DbQuery = dbQuery) => {
	return {
		categories: new CategoriesStore(db),
		products: new ProductsStore(db),
		client: new Client(db, bot),
		checkout: new CheckoutService(db, bot)
	};
};

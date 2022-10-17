import { Bot } from 'src/customTypes/bot';
import { IOrder, IOrderDBData } from 'src/customTypes/checkout';
import { DbQuery } from 'src/customTypes/db';

export class CheckoutService {
	constructor(private readonly dbQuery: DbQuery, private readonly bot: Bot) {}

	public async createOrder(checkoutData: IOrder) {
		try {
			await this.dbQuery(
				`INSERT INTO orders (chat_id, name, phone, adress, products) VALUES ('${
					checkoutData.chat_id
				}', '${checkoutData.name}', '${checkoutData.phone}', '${
					checkoutData.adress
				}', '${JSON.stringify(checkoutData.products)}')`
			);
		} catch (err) {
			console.log(err);
		}
	}

	public async getOrdersByChatId(chatId: number) {
		try {
			const ordersQuery: IOrderDBData[] = await this.dbQuery(
				`SELECT * FROM orders WHERE chat_id = ${chatId}`
			);
			const orders: IOrder[] = ordersQuery.map(order => {
				order.products = JSON.parse(order.products);
				return order;
			});
			return [...orders];
		} catch (err) {
			console.log(err);
			return null;
		}
	}

	public async getLatestOrder(chatId: number) {
		try {
			const ordersQuery: IOrderDBData[] = await this.dbQuery(
				`SELECT 1 FROM orders WHERE chat_id = ${chatId} ORDER BY id DESC LIMIT 1`
			);
			if (ordersQuery.length === 0) return [];
			return ordersQuery[0];
		} catch (err) {
			console.log(err);
			return null;
		}
	}
}

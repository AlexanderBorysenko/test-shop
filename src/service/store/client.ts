import { Bot } from 'src/customTypes/bot';
import { ICart } from 'src/customTypes/cart';
import { IClient } from 'src/customTypes/client';
import { DbQuery } from 'src/customTypes/db';
import { ICartProduct } from 'src/customTypes/product';

export class Client {
	constructor(private readonly dbQuery: DbQuery, private readonly bot: Bot) {}

	async createClient(chatId: number) {
		try {
			await this.dbQuery(
				`INSERT INTO clients (chat_id, cart) VALUES (${chatId}, '[]')`
			);
		} catch (err) {
			console.log(err);
		}
	}

	async getClientByChatId(chatId: number) {
		try {
			const result: IClient[] = await this.dbQuery(
				`SELECT * FROM clients WHERE chat_id = ${chatId}`
			);
			if (result.length === 0) return null;
			return { ...result[0] };
		} catch (err) {
			console.log(err);
			return null;
		}
	}

	async updateClientCart(chatId: number, cart: string) {
		try {
			await this.dbQuery(
				`UPDATE clients SET cart = '${cart}' WHERE chat_id = ${chatId}`
			);
		} catch (err) {
			console.log(err);
		}
	}

	async addProductToCart(chatId: number, productId: number) {
		try {
			const client = await this.getClientByChatId(chatId);
			if (!client) {
				await this.createClient(chatId);
				await this.addProductToCart(chatId, productId);
				return;
			}
			const cart: ICart = JSON.parse(client.cart);
			const productIndex = cart.findIndex(
				(product: { id: number }) => product.id === productId
			);

			if (productIndex === -1) {
				const product = (await this.bot.store.products.getProductById(
					productId
				)) as ICartProduct;

				if (product) {
					product.count = 1;
					cart.push(product);
				}
			} else {
				cart[productIndex].count++;
			}

			await this.updateClientCart(chatId, JSON.stringify(cart));
		} catch (err) {
			console.log(err);
		}
	}

	async removeProductFromCart(chatId: number, productId: number) {
		try {
			const client = await this.getClientByChatId(chatId);
			if (!client) return;

			const cart: ICart = JSON.parse(client.cart);

			await this.updateClientCart(
				chatId,
				JSON.stringify(
					cart.filter(
						(product: { id: number }) => product.id !== productId
					)
				)
			);
		} catch (err) {
			console.log(err);
		}
	}

	async getClientCart(chatId: number) {
		try {
			const client = await this.getClientByChatId(chatId);
			if (!client) return [];
			return JSON.parse(client.cart);
		} catch (err) {
			console.log(err);
			return [];
		}
	}
}

import { ICartProduct } from './product';

export interface IOrder {
	id: number;
	chat_id: number;
	name: string;
	phone: string;
	adress: string;
	products: ICartProduct[];
}

export type IOrderDBData = {
	products: string;
} & IOrder;

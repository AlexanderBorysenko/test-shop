export interface IProduct {
	id: number;
	name: string;
	price: number;
	description: string;
	image: string;
	category: number;
}

export interface ICartProduct extends IProduct {
	count: number;
}

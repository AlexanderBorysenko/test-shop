import { ICategory } from 'src/customTypes/category';
import { Bot } from 'src/customTypes/bot';

export class CategoryController {
	constructor(private readonly bot: Bot) {}

	async listCategories(
		categories: ICategory[],
		chatId: number,
		extra_inline_keyboard = []
	) {
		const inline_keyboard = categories.map(category => {
			return [
				{
					text: category.name,
					callback_data: `/select_category ${category.id}`
				}
			];
		});
		inline_keyboard.push(extra_inline_keyboard);

		await this.bot.sendMessage(chatId, 'Оберіть категорію', {
			reply_markup: {
				inline_keyboard
			}
		});
	}

	async listCategoriesByParentId(chatId: number, parentCategoryId: number) {
		const categories =
			await this.bot.store.categories.getCategoriesByParentId(
				parentCategoryId
			);
		const currentCategory = await this.bot.store.categories.getCategoryById(
			parentCategoryId
		);

		if (currentCategory) {
			await this.bot.sendMessage(
				chatId,
				`Обрана Категорія: ${currentCategory.name}`
			);
		}

		if (categories.length !== 0) {
			await this.listCategories(
				categories,
				chatId,
				await this.goToParentCategoryKeyboardButtonMarkup(
					parentCategoryId
				)
			);
		} else {
			await this.bot.controller.products.listProductsByCategoryId(
				chatId,
				parentCategoryId
			);
			setTimeout(async () => {
				await this.goToParentCategoryButton(chatId, parentCategoryId);
			}, 200);
		}
	}
	async goToParentCategoryKeyboardButtonMarkup(currentCategoryId: number) {
		const category = await this.bot.store.categories.getCategoryById(
			currentCategoryId
		);

		if (category && category.parent !== 0) {
			const parentCategory =
				await this.bot.store.categories.getCategoryById(
					category.parent
				);
			return [
				{
					text: `< ${parentCategory.name}`,
					callback_data: `/select_category ${parentCategory.id}`
				}
			];
		} else if (category) {
			return [
				{
					text: `< Головна`,
					callback_data: `/select_category 0`
				}
			];
		}
	}
	async goToParentCategoryButton(chatId: number, parentCategoryId: number) {
		return await this.bot.sendMessage(chatId, `Назад до`, {
			reply_markup: {
				inline_keyboard: [
					await this.goToParentCategoryKeyboardButtonMarkup(
						parentCategoryId
					)
				]
			}
		});
	}

	async listParentCategory(chatId: number, parentCategoryId: number) {
		const category = await this.bot.store.categories.getCategoryById(
			parentCategoryId
		);

		if (category.parent !== 0) {
			await this.listCategoriesByParentId(chatId, category.parent);
		} else {
			await this.bot.controller.navigation.goHome(chatId);
		}
	}
}

import {Page, Locator} from '@playwright/test'

export class InventoryPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly inventoryItems: Locator;
    readonly sortDropDown: Locator;
    readonly cartIcon: Locator;
    readonly cartBadge: Locator;

    constructor (page: Page) {
        this.page = page;
        this.pageTitle = page.locator('.title');
        this.inventoryItems = page.locator('.inventory_item');
        this.sortDropDown = page.locator('[data-test="product-sort-container"]');
        this.cartIcon = page.locator('.shopping_cart_link');
        this.cartBadge = page.locator('.shopping_cart_badge');
    }

    async addProductToCart (productName: string) {
        const item = this.page.locator('.inventory_item', {hasText: productName});
        await item.getByRole('button', {name: 'Add to cart'}).click();
    }

    async removeProductFromCart (productName:string) {
        const item = this.page.locator('.inventory_item', {hasText: productName});
        await item.getByRole('button', {name: 'Remove'}).click();
    }

    async sortBy (option: string) {
        await this.sortDropDown.selectOption(option);
    }

    async goToCart() {
        await this.cartIcon.click();
    }

    async getCartCount() : Promise<string> {
        return await this.cartBadge.innerText();
    }
}
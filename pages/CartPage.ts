import { Locator, Page } from "@playwright/test";

export class CartPage {
    readonly page: Page;
    readonly cartItems: Locator;
    readonly checkoutButton: Locator;
    readonly continueShoppingButton: Locator;

    constructor (page: Page) {
        this.page = page;
        this.cartItems = page.locator('.cart_item');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]')
    }

    async getItemCount (): Promise<number> {
        return await this.cartItems.count();
    }

    async proceedToCheckout() {
        await this.checkoutButton.click();
    }
}
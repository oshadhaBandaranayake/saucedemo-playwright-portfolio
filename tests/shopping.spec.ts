import { test,expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";

test.describe('Shopping Cart Tests', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;

    test.beforeEach (async ({page}) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);

        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');
    });

    test ('Add single product to cart', async () => {
        await inventoryPage.addProductToCart ('Sauce Labs Backpack');
        const count = await inventoryPage.getCartCount();
        expect (count).toBe('1');
    });

    test ('Add multiple products to cart', async () => {
        await inventoryPage.addProductToCart('Sauce Labs Backpack');
        await inventoryPage.addProductToCart('Sauce Labs Bike Light');
        await inventoryPage.addProductToCart('Test.allTheThings() T-Shirt (Red)');
        const count = await inventoryPage.getCartCount();
        expect (count).toBe('3');
    });

    test ('Remove product from cart', async () => {
        await inventoryPage.addProductToCart('Sauce Labs Bolt T-Shirt');
        await inventoryPage.removeProductFromCart('Sauce Labs Bolt T-Shirt');
        await expect (inventoryPage.cartBadge).toHaveCount (0);
    });

    test ('Sort products by price low to high', async ({page}) => {
        await inventoryPage.sortBy('lohi');
        const firstPrice = await page.locator('.inventory_item_price').first().innerText();
        expect(firstPrice).toBe('$7.99');
    })

    test ('Sort products by price high to low', async ({page}) => {
        await inventoryPage.sortBy('hilo');
        const firstPrice = await page.locator('.inventory_item_price').first().innerText();
        expect (firstPrice).toBe('$49.99');
    });

    test ('View cart page after adding item', async () => {
        await inventoryPage.addProductToCart('Sauce Labs Backpack');
        await inventoryPage.addProductToCart('Sauce Labs Bolt T-Shirt');
        await inventoryPage.goToCart();
        const itemCount = await cartPage.getItemCount();
        expect (itemCount).toBe(2);
    });
})
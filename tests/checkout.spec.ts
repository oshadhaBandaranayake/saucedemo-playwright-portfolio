import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";

test.describe ('Checkout Flow Tests', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;
    let checkoutPage: CheckoutPage;

    test.beforeEach (async ({page}) => {
            loginPage = new LoginPage(page);
            inventoryPage = new InventoryPage(page);
            cartPage = new CartPage(page);
            checkoutPage = new CheckoutPage(page);

            await loginPage.goto();
            await loginPage.login('standard_user', 'secret_sauce');
            await inventoryPage.addProductToCart('Sauce Labs Backpack');
            await inventoryPage.goToCart();
            await cartPage.proceedToCheckout();
    });

    test ('Complete a full checkout successfully', async () => {
        await checkoutPage.fillInfo('Oshadha', 'Bandaranayake', '70200');
        await checkoutPage.finishOrder();
        const confirmation = await checkoutPage.getConfirmationText();
        expect (confirmation).toContain('Thank you for your order!');
    });

    test ('Checkout fails with missing postal code', async ({page}) => {
        await checkoutPage.firstNameInput.fill('Oshadha');
        await checkoutPage.lastNameInput.fill('Dilsankha');
        await checkoutPage.continueButton.click();
        await expect(page.locator('[data-test="error"]')).toContainText('Postal code is required');
    });
});
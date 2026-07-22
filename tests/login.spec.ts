import {test, expect} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Tests', () => {
    let loginPage: LoginPage

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    test ('Login with valid credentials', async ({page}) => {
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL(/inventory/);
    });

    test('Login with locked out user', async () => {
        await loginPage.login('locked_out_user', 'secret_sauce');
        await expect(loginPage.errorMessage).toContainText(
            'Sorry, this user has been locked out.'
        );
    });

    test('Login with wrong password', async () => {
        await loginPage.login('standard_user', 'wrong_password');
        await expect(loginPage.errorMessage).toBeVisible();
    });

    test ('Login with empty username', async () => {
        await loginPage.login('', 'secret_sauce');
        await expect(loginPage.errorMessage).toContainText(
            'Username is required'
        );

    })
})
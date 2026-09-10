import { test, expect } from '@playwright/test';

test.describe('Sample tests', () => {

    test('Buy 1 stock - cash balance gets updated correctly', async ({ page }) => {

        await page.goto('index.html');

        // select ticker
        await page
            .getByTestId('stock-list')
            .getByRole('listitem')
            .filter({ hasText: 'MSFT' })
            .click()

        // get latest price 
        const marketPrice = Number(await page.getByTestId('stock-price').textContent());

        // fill price and qty
        await page.getByLabel('Limit Price').fill(marketPrice.toString());
        await page.getByLabel('Quantity').fill('2');

        // click buy
        await page.getByRole('button', { name: 'Buy', exact: true }).click();

        // get cash balance, check it
        const cashBalance = Number(await page.getByTestId('cash').textContent());
        expect(cashBalance).toBeCloseTo(10_000 - 2 * marketPrice, 2);

    });


    test('Input invalid quantity - error message is shown', async ({ page }) => {

        await page.goto('index.html');


        await page
            .getByTestId('stock-list')
            .getByRole('listitem')
            .filter({ hasText: 'MSFT' })
            .click();
        
        
        await page.getByLabel('Quantity').fill('5.1');
        await page.getByRole('button', { name: 'Buy', exact: true }).click();
        await expect(page.getByTestId('qty-error')).toBeVisible();
    });
});


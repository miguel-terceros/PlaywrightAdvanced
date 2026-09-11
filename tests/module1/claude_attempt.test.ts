import { test, expect } from '@playwright/test';

test.describe('Buy then sell tests', () => {

    test('Buy 1 stock then sell it - cash balance returns to initial and portfolio is empty', async ({ page }) => {

        await page.goto('index.html');

        // select ticker
        await page
            .getByTestId('stock-list')
            .getByRole('listitem')
            .filter({ hasText: 'MSFT' })
            .click();

        // get latest price
        const marketPrice = Number(await page.getByTestId('stock-price').textContent());

        // fill price and qty
        await page.getByLabel('Limit Price').fill(marketPrice.toString());
        await page.getByLabel('Quantity').fill('1');

        // buy 1 stock
        await page.getByRole('button', { name: 'Buy', exact: true }).click();

        // verify new cash balance
        const cashAfterBuy = Number(await page.getByTestId('cash').textContent());
        expect(cashAfterBuy).toBeCloseTo(10_000 - marketPrice, 2);

        // sell the 1 stock
        await page.getByRole('button', { name: 'Sell', exact: true }).click();

        // verify cash balance is back to 10_000
        const cashAfterSell = Number(await page.getByTestId('cash').textContent());
        expect(cashAfterSell).toBeCloseTo(10_000, 2);

        // verify portfolio is empty
        await expect(page.getByTestId('portfolio-table').locator('tbody tr')).toHaveCount(0);
    });
});

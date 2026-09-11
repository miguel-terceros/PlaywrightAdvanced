import { test, expect } from '@playwright/test';
import { StockTradingPage } from '../module2/pages/StockTradingPage.js';

test('Buy and sell 1 stock restores cash and empties portfolio', async ({ page }) => {
    await page.goto('index.html');

    await page
        .getByTestId('stock-list')
        .getByRole('listitem')
        .filter({ hasText: 'MSFT' })
        .click();

    const marketPrice = Number(await page.getByTestId('stock-price').textContent());

    await page.getByLabel('Limit Price').fill(marketPrice.toString());
    await page.getByLabel('Quantity').fill('1');
    await page.getByRole('button', { name: 'Buy', exact: true }).click();

    await expect(page.getByTestId('cash')).toHaveText((10_000 - marketPrice).toFixed(2));

    await page.getByRole('button', { name: 'Sell', exact: true }).click();

    await expect(page.getByTestId('cash')).toHaveText('10000.00');
    await expect(page.getByTestId('portfolio-table').locator('tbody tr')).toHaveCount(0);
});

/**
 * 3 things to make AI output useful:
 * 
 * 1) A high-quality LLM model
 * 2) A well-structured prompt (invest some time into it!)
 * 3) A high-quality code base (for context)
 */

test('Same scenario, but with POM', async ({ page }) => {
    const stockTradingPage = new StockTradingPage(page);

    await stockTradingPage.goto();
    await stockTradingPage.ticker('MSFT').click();

    const marketPrice = Number(await stockTradingPage.currentPrice().textContent());

    await stockTradingPage.limitPriceInput().fill(marketPrice.toString());
    await stockTradingPage.quantityInput().fill('1');
    await stockTradingPage.buyButton().click();

    await expect(stockTradingPage.cashBalance()).toHaveText((10_000 - marketPrice).toFixed(2));

    await stockTradingPage.sellButton().click();

    await expect(stockTradingPage.cashBalance()).toHaveText('10000.00');
    await expect(stockTradingPage.portfolio().locator('tbody tr')).toHaveCount(0);
});

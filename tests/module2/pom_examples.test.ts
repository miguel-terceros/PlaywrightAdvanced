import { expect, test } from "@playwright/test";
import { StockTradingPage } from "./pages/StockTradingPage.js";
import { StockTradingPage2 } from "./pages/StockTradingPage2.js";
import { AnalyticsPage } from "./pages/AnalyticsPage.js";
import type { Order } from "./pages/types/Order.js";
import { Pages } from "./pages/Pages.js";

test("POM Level 1 Demo - Attempt to buy more that the available cash balance", async ({ page }) => {

    const stokTradingPage = new StockTradingPage(page);

    await stokTradingPage.goto();

    // Select MSFT
    await stokTradingPage.ticker('MSFT').click();

    // Get market price
    const marketPrice = Number(await stokTradingPage.currentPrice().textContent());

    // Attempt to buy 100 shares - should trigger validation error since cash balance is only 10.000
    await stokTradingPage.limitPriceInput().fill(marketPrice.toString());
    await stokTradingPage.quantityInput().fill('100');
    await stokTradingPage.buyButton().click();

    // verify price error message is visible and has correct text
    await expect(stokTradingPage.actionError()).toBeVisible();
    await expect(stokTradingPage.actionError()).toHaveText('Insufficient cash');

});

test("POM Level 2 Demo - same scenario", async ({ page }) => {

    const stokTradingPage = new StockTradingPage2(page);

    await stokTradingPage.goto();

    // Select MSFT
    await stokTradingPage.selectTicker('MSFT');

    // Get market price
    const marketPrice = Number(await stokTradingPage.currentPrice().textContent());

    // Attempt to buy 100 shares - should trigger validation error since cash balance is only 10.000
    await stokTradingPage.enterPrice(marketPrice.toString());
    await stokTradingPage.enterQuantity('100');
    await stokTradingPage.clickBuy();

    // verify price error message is visible and has correct text
    await expect(stokTradingPage.actionError()).toBeVisible();
    await expect(stokTradingPage.actionError()).toHaveText('Insufficient cash');

});

test('Using navigation - StockTradingPage', async ({ page }) => {

    const stockTradingPage = new StockTradingPage(page);

    await stockTradingPage.goto();

    // select MSFT
    await stockTradingPage.ticker('MSFT').click();
    const marketPrice = Number(await stockTradingPage.currentPrice().textContent());
    await stockTradingPage.limitPriceInput().fill(marketPrice.toString());
    await stockTradingPage.quantityInput().fill('1');
    await stockTradingPage.buyButton().click();

    await stockTradingPage.navigation().analyticsLink().click();

    const analyticsPage = new AnalyticsPage(page);

    const expectedCash = (10_000 - marketPrice).toFixed(2);
    await expect(analyticsPage.cashBalance()).toHaveText(expectedCash);

    analyticsPage.navigation().tradeLink().click();

});

test('With custom Order type', async ({ page }) => {
    const stockTradingPage = new StockTradingPage2(page);
    await stockTradingPage.goto();

    await stockTradingPage.selectTicker('AMZN');
    // Get market price
    const marketPrice = Number(await stockTradingPage.currentPrice().textContent());

    const order: Order = {
        ticker: 'AMZN',
        price: marketPrice,
        quantity: 10,
        side: 'buy'
    };

    await stockTradingPage.placeOrder(order);
});

test('Pages factory demo', async ({ page }) => {
    const ui = new Pages(page);

    await ui.stockPage.goto();
    await ui.stockPage.ticker('AMZN').click();

    const msg = await ui.analyticsPage.cashBalance().textContent();
});
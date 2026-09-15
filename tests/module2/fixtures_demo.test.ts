import { expect, test } from "../module2/pages/fixtures/base.js";

test('Build-in fixtures', async ({ page, browser, request }) => {
    page.goto('');


    const ctx = browser.newContext({ 

    });


    const response = await request.post('');
});

test('Custom Fixture Page', async ({ stockPage }) => {
    console.log("inside the test")

    await stockPage.goto();

    await stockPage.ticker('MSFT').click();

    const marketPrice = Number(await stockPage.currentPrice().textContent());

    await stockPage.limitPriceInput().fill(marketPrice.toString());
    await stockPage.quantityInput().fill('100');
    await stockPage.buyButton().click();

    await expect(stockPage.actionError()).toBeVisible();
    await expect(stockPage.actionError()).toHaveText('Insufficient cash');
});

test("Override existing page fixture", async ({ stockPage}) => {

    await stockPage.goto();
});
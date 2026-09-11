import { expect, test as base } from "@playwright/test";
import { StockTradingPage  } from "../StockTradingPage.js";
import { AnalyticsPage } from "../AnalyticsPage.js";

export type PageFixtures = {
    stockPage: StockTradingPage,
    analyticsPage: AnalyticsPage
}

export const test = base.extend<PageFixtures>({

    stockPage: async ({ page }, use) => {
        const stockPage = new StockTradingPage(page);
        await use(stockPage);
    },

    analyticsPage: async ({ page }, use) => {
        const analyticsPage = new AnalyticsPage(page);
        await use(analyticsPage);
    },
})

// no failJSError or other extra fixtures

export const strictTest = test.extend({
    page: async ({ page }, use) => {

        // Monitor the console
        page.on("pageerror", error => {
            console.log(`Found an error: ${error.name}, ${error.message}`);
            expect.soft(error.name).not.toEqual("Error");
        });

        // Monitor network responses

        page.on("response", response => {
            expect.soft(response.status(), 
            `Response with status ${response.status()} for URL: ${response.url()}`).toBeLessThan(300);
        });

        await use(page);
    }
})

export { expect } from "@playwright/test";
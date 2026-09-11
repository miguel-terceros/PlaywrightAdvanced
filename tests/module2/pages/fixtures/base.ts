import { test as base, expect } from "@playwright/test";
import { StockTradingPage } from "../StockTradingPage.js";
import { StockTradingPage2 } from "../StockTradingPage2.js";
import { AnalyticsPage } from "../AnalyticsPage.js";

export type PageFixtures = {
    stockPage: StockTradingPage,
    stockPage2: StockTradingPage2,
    analyticsPage: AnalyticsPage
}

export type ConfigOptions = {
    failOnJSError: boolean;
    failOnNetworkError: boolean;

}

export const test = base.extend<PageFixtures & ConfigOptions>({

    stockPage: async ({ page }, use) => {
        const stockPage = new StockTradingPage(page);

        // place for global hooks (?)
        console.log("do stuff before");
        await use(stockPage);
        console.log("do stuff after");
    },
    analyticsPage: async ({ page }, use) => {
        const analyticsPage = new AnalyticsPage(page);

        await use(analyticsPage);
    },
    stockPage2: async ({ page }, use) => {
        const stockPage2 = new StockTradingPage2(page);

        await use(stockPage2);
    },

    failOnJSError: [true, { }],
    failOnNetworkError: [true, { 
        option: true,       // override via config
        timeout: 5000,      // for slow hooks
        title: 'as seen in reports and elsewhere',
        box: 'self'
     }],

    // override the native fixture
    page: async ({ page, failOnJSError, failOnNetworkError }, use ) => {

        const errors: Array<Error> = [];
        page.on("pageerror", error => {
            errors.push(error);
        })

        if (failOnNetworkError) {
            page.on("response", response => {
                expect.soft(response.status(), `Response with status ${response.status()} for URL: ${response.url()}`).toBeLessThan(400);
            })
        }

        await use(page);

        if (failOnJSError) {
            expect(errors).toHaveLength(0);
        }
    }
});

export { expect } from "@playwright/test";
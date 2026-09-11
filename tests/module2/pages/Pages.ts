import type { Page } from "@playwright/test";
import { AnalyticsPage } from "./AnalyticsPage.js";
import { StockTradingPage } from "./StockTradingPage.js";
import { StockTradingPage2 } from "./StockTradingPage2.js";


export class Pages {

    private stockPg?: StockTradingPage;
    private stockPg2?: StockTradingPage2;
    private analyticsPg?: AnalyticsPage;

    constructor(private page: Page) {}

    get stockPage() {
        return this.stockPg ??= new StockTradingPage(this.page);
    }

    get stockPage2() {
        return this.stockPg2 ??= new StockTradingPage2(this.page);
    }

    get analyticsPage() {
        return this.analyticsPg ??= new AnalyticsPage(this.page);
    }
}
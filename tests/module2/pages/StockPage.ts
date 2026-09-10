import type { Locator, Page } from '@playwright/test';

export class StockPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('index.html');
    }

    /* ========= Left column ========= */
    selectTicker(ticker: string): Locator {
        return this.page
            .getByTestId('stock-list')
            .getByRole('listitem')
            .filter({ hasText: ticker })
    }

    /* ========= Right column ========= */


    // Form for placing buy/sell orders
    currentPrice(): Locator {
        return this.page.getByTestId('stock-price');
    }

    limitPriceInput(): Locator {
        return this.page.getByLabel('Limit Price');
    }

    quantityInput(): Locator {
        return this.page.getByLabel('Quantity');
    }

    valueInput(): Locator {
        return this.page.getByLabel('Value');
    }

    buyButton(): Locator {
        return this.page.getByRole('button', { name: 'Buy', exact: true });
    }

    sellButton(): Locator {
        return this.page.getByRole('button', { name: 'Sell', exact: true });
    }

    // form error messages
    priceError(): Locator {
        return this.page.getByTestId('price-error');
    }

    qtyError(): Locator {
        return this.page.getByTestId('qty-error');
    }

    actionError(): Locator {
        return this.page.getByTestId('action-error');
    }


    /* ========= Portfolio ========= */

    cashBalance(): Locator {
        return this.page.getByTestId('cash');
    }

    portfolio(): Locator {
        return this.page.getByTestId('portfolio-table');
    }
}
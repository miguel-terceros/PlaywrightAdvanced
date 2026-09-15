import { test, expect, type Page } from "@playwright/test";
import { time } from "node:console";

test('...', async ({ page }) => {

    await test.step('Do Things', async () => {

        // at this point await it is not necessary
        const locator = page.getByTestId('some-id');

        // forgotten awaits
        // biome not catching here
        await page.goto('');
        await page.getByTestId('some-id').click();

        // more actions
        // forgotten await too
        await expect(page.getByRole('button')).toBeVisible();
    });
});

test('Poor waiting examples', async ({ page }) => {

    // adding "waits"
    // most are redundant, wrong, or give false confidence

    // wait for the page to finish fetching resources
    // exotic use cases, NOT test automation
    await page.goto('...', {waitUntil: 'networkidle'});

    // click...
    // legitimate use case: redirects: page1 -> page2 -> page3....
    // shows intent
    await page.waitForURL('...');

    const locator = page.getByRole('button', { name: 'submit'});
    // await locator.waitFor({ state: 'visible' })

    // the worst!
    page.waitForTimeout(100);

});

test('toPass and Poll', async ({ page }) => {

    const retry = {
        slow: { intervals: [1_000, 2_000, 10_000], timeout: 60_000},
        fast: { intervals: [500, 1_000], timeout: 10_000}
    };

    const toPassConfig = {
        intervals: [1_000, 2_000, 10_000],
        timeout: 60_000
    };

    // exception, not the norm
    await expect( async () => {

        // problematic action + expect
        await page.getByTestId('id1').click();
        await expect(page.getByTestId('id2')).toBeVisible();

    }).toPass(toPassConfig);

    await expect.poll( async () => {

        // retry and return one value, typically from API/DB
        const response = await page.request.get('https://api.example.com');
        return response.status();
    }, {}).toBe(200);

})
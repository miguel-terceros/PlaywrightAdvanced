import { test } from "@playwright/test";

/**
 * Project structure
 * =============================================
 * 
 * test-data/                   - data factories, reusable objects, CSV and JSON files
 * 
 * pages/
 *      sections/
 *      fixtures/
 *      types/      or domain_objects/      - order, cart, item, patient, record
 * 
 * tests/
 *      trding/
 *      analytics/
 *      reporting/
 *      settings/
 *      deposit-withdrawal/
 *      login/
 *      mobile?     strinct?    smoke?  regression?     api?
 * 
 * utils/ or helpers/           - rouding, formatting, data & time, constants
 * 
 * .gitignore
 * package.json                 - dependencies
 * playwright.config.js         - test run
 * tsconfig.js                  - code rules
 */

test.describe("Group description", { tag: '@group-tag' } , () => {
   
    
    // `test(title, body)`
    // `test(title, details, body)`


    // run -> npx playwright test --grep "@smoke"
    test("Test 1", {
        tag: '@smoke'
    } , async () => {

    });

    test("Test 2", {
        tag: ['@smoke', '@login']
    } , async () => {

    });

    test("Test 3", {
        annotation: {
            type: '',
            description: ''
        }
    } , async () => {

    });

});
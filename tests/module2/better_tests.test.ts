import { test } from "@playwright/test";

/**
 * Title -> purpose
 * Better context for humans and AI
 * Many contributors -> inconsistent style
 * 
 * Template!        
 * { most important aspect } - { expected action }
 * 
 * Buy one stock            - cash and portfolio updated
 * Buy two stocks           - cash and portfolio updated
 * 
 * Sell one stock           - cash and portfolio updated
 * Sell all stocks          - cash updated, portfolio empty
 * 
 * Sell stock not owned                     - reject, cash and portfolio unchanged
 * Sell stock owned, but qty > owned qty    - reject, cash and portfolio unchanged
 * 
 * Offline:
 * Buy stock when offline   - reject, cash and portfolio unchanged
 * 
 */

test.describe("Group actions", () => {

    test("Buy one stock", async () => {

    });
    
    test("Buy two stock", async () => {
    
    });
    
    test("Sell one stock", async () => {
    
    });
    
    test("Sell two stock", async () => {
    
    });
    
    test("Sell all stocks", async () => {
    
    });
    
});




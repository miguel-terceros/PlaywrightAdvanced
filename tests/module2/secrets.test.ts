import { test } from "@playwright/test";
import "@dotenvx/dotenvx/config";

test("Secret from .env", async () => {

    const key = "your_secret_key";          // hard-coded line

    // much better than hard-coded secrets in code
    //. still not great
    console.log(`Key is: ${process.env.KEY}`);



});

test("Secret from dotenx", async () => {

    /**
     *  1) commit secret, but encrypted + public key
     *  2) store private key elsewhere
     */

    // further improvement, but not 100% bulletproof
    // does not protect agains malware, stolen device (unlocked)
    console.log(`Key is: ${process.env.X_KEY}`);

})

test("AI Secrets Example", async () => {
    /**
     * Working with AI = they can read your secrets
     * 
     * 1) fix a failling test or debug
     * 2) may add a console.log() and print the secret
     * 3) read the terminal output
     */

    /**
     * Restrict what the model can read
     * network level: parse outbound traffic and replace secrets
     */

    console.log(`X_KEY is: ${process.env.X_KEY}`);
})
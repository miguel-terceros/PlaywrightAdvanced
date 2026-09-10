import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  
  testDir: './tests',
  reporter: 'html',
  fullyParallel: true,
  workers: process.env.CI ? 1 : '50%',
    
  use: {
    baseURL: 'http://localhost:3000/',
    actionTimeout: 5000 
    ,
    headless: false,
    launchOptions: { slowMo: 1000 },
  },

  webServer: {
    command: 'npm run start',
    url: 'http://localhost:3000/',
    reuseExistingServer: !process.env.CI,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ],
});

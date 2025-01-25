import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4000/#/',
    viewportWidth: 1300,
    viewportHeight: 800,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  }
});

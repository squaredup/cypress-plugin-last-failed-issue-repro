import { defineConfig } from 'cypress'
const { collectFailingTests } = require('cypress-plugin-last-failed')

export default defineConfig({
  screenshotOnRunFailure: false,
  env: {
    grepOmitFiltered: true,
    grepFilterSpecs: true,
  },
  e2e: {
    baseUrl: 'https://example.com',
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      collectFailingTests(on, config)

      // Register a simple log task
      on('task', {
        log(message) {
          console.log(message)
          return null
        },
      })

      require('@bahmutov/cy-grep/src/plugin')(config)
      return config
    },
  },
  viewportWidth: 1280,
  viewportHeight: 720,
  video: false
})

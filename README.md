# Cypress Plugin Last Failed

This repository demonstrates an issue with the [`cypress-plugin-last-failed`](https://www.npmjs.com/package/cypress-plugin-last-failed) npm package (version `2.0.8`).

When a test fails inside a `before` hook, the generated `last-run.json` file includes **only the first test** from the spec file. As a result, rerunning failed tests (`npm run cy:rerun:failed`) only re-executes that first test, even when the spec contains multiple tests.

This behavior poses a risk of unintentionally skipping tests that should have been rerun.

---

## Reproduction Steps

1. **Install dependencies**:
   ```
   npm install
   ```
2. **Run the Cypress tests**:
   ```
   npm run cy:run
   ```
3. **Check the output**:
   - This will generate `test-results/last-run.json`
   - You'll see it includes only one test, even though `cypress/e2e/example.cy.ts` defines two tests
4. **Remove the failing line**:
   - Open `cypress/e2e/example.cy.ts` and remove line 15 (which causes the failure in the `before` hook).
5. **Rerun failed tests**:
   ```
   npm run cy:rerun:failed
   ```

6. **Check the result**:
   - Only the first test is executed and the second test is skipped even though it’s in the same spec.

  ---

## Expected Behavior

  If a failure occurs in a shared before hook, all tests in that spec file should be rerun, not just the first one. This would prevent unintentionally skipping tests that may also be affected by the shared setup.

This is a test automation project that tests sauce demo site

Currently has:
1. BDD and non-BDD tests
2. Report generation for both kinds of tests
3. Github actions workflows:
• Scheduled cron job that runs the bdd tests daily
• Workflow that runs when Dummy Dev repo (one of my other repo) has a push

To run a specific feature file:
1. Open terminal either by clicking Terminal then selecting new terminal, or by pressing Ctrl + Shift + `
2. Run this command and replace the name of the feature file 'npm run test:feature #NameOfTheFeatureFile.feature'
3. To generate Cucumber (BDD) reports run this command 'node report.js'

To run non-BDD test cases
1. Open terminal either by clicking Terminal then selecting new terminal, or by pressing Ctrl + Shift + `
2. Run this command and replace the name of the test file 'npx playwright test #NameOfTheTestFile.ts'
    note: can add --headed to run it in headed mode
3. To generate playwright (Non-BDD) report run this command 'npx playwright show-report'

To run playwright test runner
1. Run this command 'npx playwright test --ui'

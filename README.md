Hi, This is my own automation testing project created to both highlight my automation skills and also to improve it. At this time around I would be using Playwright using Js and using saucedemo test site. For performance test, I used Apache JMeter on Restful-Booker test site

Linkedin Profile: https://www.linkedin.com/in/jerome-san-juan-7b37a4121

Currently has:
1. BDD and non-BDD tests
2. Report generation for both kinds of tests
3. Github actions workflows:
• Scheduled cron job that runs the bdd tests daily
• Workflow that runs when Dummy Dev repo (one of my other repo) has a push
4. JMeter test plan for performance testing of Restful-Booker test site. Did not use the same site as the UI test for this as that site does not have real API endpoints. Also included is the test result for my stress test there.
   
To run a specific feature file:
1. Open terminal either by clicking Terminal then selecting new terminal, or by pressing Ctrl + Shift + `
2. Run this command and replace the name of the feature file 'npm run test:feature #NameOfTheFeatureFile.feature'
3. To generate Cucumber (BDD) reports run this command 'node report.js'

To run non-BDD test cases
1. Open terminal either by clicking Terminal then selecting new terminal, or by pressing Ctrl + Shift + `
2. Run this command and replace the name of the test file 'npx playwright test #NameOfTheTestFile.js'
3. To generate playwright (Non-BDD) report run this command 'npx playwright show-report'

JMeter stress test dashboard<img width="1584" height="902" alt="jmeter-dashboard" src="https://github.com/user-attachments/assets/1436e09c-1be9-4aca-8e53-b5587c359c35" />

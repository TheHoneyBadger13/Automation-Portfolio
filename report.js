const reporter = require('multiple-cucumber-html-reporter');
const path = require('path');

// Generate timestamp in format: 09:23PM 15 Dec 2025
const now = new Date();
let hours = now.getHours();
const minutes = String(now.getMinutes()).padStart(2, '0');
const ampm = hours >= 12 ? 'PM' : 'AM';
// Convert to 12-hour format
hours = hours % 12 || 12;
const hoursFormatted = String(hours).padStart(2, '0');
const day = String(now.getDate()).padStart(2, '0');
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const month = monthNames[now.getMonth()];
const year = now.getFullYear();

const timestamp = `${hoursFormatted} ${minutes}${ampm} ${day} ${month} ${year}`;
const reportPath = path.join('reports', 'html', timestamp);

reporter.generate({
  jsonDir: 'reports',          // folder with cucumber-report.json
  reportPath: reportPath,      // output folder with timestamped name
  displayDuration: true,
  metadata: {
    browser: {
      name: 'chromium',
      version: 'latest'
    },
    device: 'Local test machine',
    platform: {
      name: 'Windows',
      version: '11'
    }
  }
});
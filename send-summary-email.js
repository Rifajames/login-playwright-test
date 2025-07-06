const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

// === CONFIG FROM ENV ===
const GITHUB_RUN_URL = process.env.GITHUB_RUN_URL || 'https://github.com/your-org/your-repo/actions';
const EMAIL_FROM = process.env.NODEMAILER_USER;
const EMAIL_TO = process.env.RECIPIENT_EMAIL || EMAIL_FROM; // default ke pengirim kalau tidak di-set
const APP_PASSWORD = process.env.NODEMAILER_PASS;

// === PARSE CUCUMBER REPORT ===
const jsonPath = path.join(__dirname, 'reports', 'cucumber_report.json');
const rawData = fs.readFileSync(jsonPath, 'utf-8');
const scenarios = JSON.parse(rawData).flatMap(f => f.elements || []);

let passed = 0, failed = 0, skipped = 0;
const failureList = [];

scenarios.forEach(scenario => {
  const name = scenario.name;
  const steps = scenario.steps || [];

  const hasFailed = steps.some(s => s.result.status === 'failed');
  const isSkipped = steps.every(s => s.result.status === 'skipped');
  const isPassed = steps.every(s => s.result.status === 'passed');

  if (hasFailed) {
    failed++;
    const failedStep = steps.find(s => s.result.status === 'failed');
    const reason = failedStep?.result?.error_message?.split('\n')[0] || 'Unknown Error';
    failureList.push(`- ${scenario.name} (${reason})`);
  } else if (isPassed) {
    passed++;
  } else if (isSkipped) {
    skipped++;
  }
});

// === EMAIL CONTENT ===
const summary = `
✅ Passed: ${passed}
❌ Failed: ${failed}
⏭️ Skipped: ${skipped}

${failed > 0 ? '❗ Failures:\n' + failureList.join('\n') : '✅ No Failures'}

🔗 Full Report: ${GITHUB_RUN_URL}
`;

async function sendEmail() {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_FROM,
      pass: APP_PASSWORD
    }
  });

  const mailOptions = {
    from: EMAIL_FROM,
    to: EMAIL_TO,
    subject: '📊 E2E Test Report - Paper.id',
    text: summary,
    attachments: [
      {
        filename: 'TestReport.html',
        path: path.join(__dirname, 'reports', 'html', 'index.html')
      }
    ]
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', info.response);
  } catch (err) {
    console.error('❌ Failed to send email:', err);
  }
}

sendEmail();
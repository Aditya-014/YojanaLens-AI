import { runAllUnitTests } from './testSuite.ts';

async function main() {
  console.log('======================================================');
  console.log('🧪 YojanaLens AI — Unit Test Suite Runner');
  console.log('   Testing Deterministic Eligibility Engine & Fallbacks');
  console.log('======================================================\n');

  const report = await runAllUnitTests();

  for (const suite of report.suites) {
    console.log(`\n📦 Suite: ${suite.name}`);
    for (const test of suite.tests) {
      const statusIcon = test.passed ? '✅ PASS' : '❌ FAIL';
      console.log(`  ${statusIcon} [${test.durationMs}ms] ${test.testName}`);
      if (!test.passed) {
        console.log(`     Expected: ${JSON.stringify(test.expected)}`);
        console.log(`     Actual:   ${JSON.stringify(test.actual)}`);
      }
    }
  }

  console.log('\n------------------------------------------------------');
  console.log(`Results: ${report.passedTests}/${report.totalTests} passed (${report.allPassed ? 'ALL TESTS PASSED' : 'SOME TESTS FAILED'})`);
  console.log('------------------------------------------------------\n');

  if (!report.allPassed) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});

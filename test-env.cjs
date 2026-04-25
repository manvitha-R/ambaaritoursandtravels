// test-env.cjs
require('dotenv').config();

console.log('DATABASE_URL from process.env:', process.env.DATABASE_URL ? '✅ FOUND' : '❌ NOT FOUND');
console.log('First 50 chars:', process.env.DATABASE_URL?.substring(0, 50));

if (!process.env.DATABASE_URL) {
  console.error('\n❌ DATABASE_URL not found!');
  console.error('Please check:');
  console.error('1. .env file exists in project root');
  console.error('2. .env has DATABASE_URL=postgresql://...');
  console.error('3. No spaces around =');
  console.error('4. No quotes around the value');
}
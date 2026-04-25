// test-neon.js
const { Client } = require('pg');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;

console.log('Testing connection to neon-indigo-canvas...');
console.log('Connection string starts with:', connectionString?.substring(0, 60) + '...');

const client = new Client({
  connectionString: connectionString,
  ssl: { rejectUnauthorized: false }
});

async function test() {
  try {
    await client.connect();
    console.log('✅ Successfully connected to neon-indigo-canvas!');
    
    const result = await client.query('SELECT NOW() as current_time');
    console.log('Database time:', result.rows[0].current_time);
    
    // List tables
    const tables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    console.log('Tables:', tables.rows.map(r => r.table_name));
    
    await client.end();
  } catch (err) {
    console.error('❌ Connection failed:', err.message);
  }
}

test();
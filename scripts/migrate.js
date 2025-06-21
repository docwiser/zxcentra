const { initializeDatabase } = require('../lib/database.ts');

try {
  initializeDatabase();
  console.log('Database migration completed successfully');
} catch (error) {
  console.error('Database migration failed:', error);
  process.exit(1);
}
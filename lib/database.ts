import { createClient } from '@libsql/client';
import path from 'path';
import fs from 'fs';

const dbPath = path.join(process.cwd(), 'data', 'database.db');

// Ensure data directory exists
const dataDir = path.dirname(dbPath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Create libsql client for local file database
const db = createClient({
  url: `file:${dbPath}`
});

// Initialize database schema
export async function initializeDatabase() {
  try {
    // Users table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        password TEXT,
        role TEXT NOT NULL DEFAULT 'user',
        permissions TEXT NOT NULL DEFAULT '[]',
        social_logins TEXT DEFAULT '[]',
        avatar TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Company settings table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS company_settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        tagline TEXT,
        description TEXT,
        logo TEXT,
        website TEXT,
        email TEXT,
        phone TEXT,
        address_street TEXT,
        address_city TEXT,
        address_state TEXT,
        address_zip TEXT,
        address_country TEXT,
        social_github TEXT,
        social_linkedin TEXT,
        social_twitter TEXT,
        social_facebook TEXT,
        social_instagram TEXT,
        social_youtube TEXT,
        founded TEXT,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Products table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        icon TEXT,
        image TEXT,
        features TEXT DEFAULT '[]',
        price TEXT,
        category TEXT,
        status TEXT DEFAULT 'active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Services table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS services (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        icon TEXT,
        image TEXT,
        deliverables TEXT DEFAULT '[]',
        category TEXT,
        status TEXT DEFAULT 'active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Blog posts table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        excerpt TEXT,
        content TEXT,
        image TEXT,
        author_id INTEGER,
        category TEXT,
        tags TEXT DEFAULT '[]',
        status TEXT DEFAULT 'draft',
        read_time TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (author_id) REFERENCES users (id)
      )
    `);

    // Blog categories table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS blog_categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Site settings table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS site_settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        key TEXT UNIQUE NOT NULL,
        value TEXT,
        type TEXT DEFAULT 'string',
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
}

// Helper functions to maintain compatibility with better-sqlite3 API
export const database = {
  prepare: (sql: string) => {
    return {
      run: async (...params: any[]) => {
        const result = await db.execute({ sql, args: params });
        return {
          changes: result.rowsAffected,
          lastInsertRowid: result.lastInsertRowid
        };
      },
      get: async (...params: any[]) => {
        const result = await db.execute({ sql, args: params });
        return result.rows[0] || null;
      },
      all: async (...params: any[]) => {
        const result = await db.execute({ sql, args: params });
        return result.rows;
      }
    };
  },
  exec: async (sql: string) => {
    await db.execute(sql);
  },
  pragma: async (pragma: string) => {
    await db.execute(`PRAGMA ${pragma}`);
  }
};

export default database;
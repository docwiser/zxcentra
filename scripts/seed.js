const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(process.cwd(), 'data', 'database.db');
if (!fs.existsSync(path.dirname(dbPath))) fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const db = new Database(dbPath);
const now = () => new Date().toISOString();

function createTables() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      name TEXT,
      password TEXT,
      role TEXT DEFAULT 'user',
      permissions TEXT DEFAULT '[]',
      social_logins TEXT DEFAULT '[]',
      avatar TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS company_settings (
      id INTEGER PRIMARY KEY,
      name TEXT,
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
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY,
      name TEXT,
      description TEXT,
      icon TEXT,
      image TEXT,
      features TEXT,
      price TEXT,
      category TEXT,
      status TEXT DEFAULT 'active',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY,
      name TEXT,
      description TEXT,
      icon TEXT,
      image TEXT,
      deliverables TEXT,
      category TEXT,
      status TEXT DEFAULT 'active',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS blog_categories (
      id INTEGER PRIMARY KEY,
      name TEXT,
      slug TEXT,
      description TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS blog_posts (
      id INTEGER PRIMARY KEY,
      title TEXT,
      slug TEXT,
      excerpt TEXT,
      content TEXT,
      image TEXT,
      author_id INTEGER,
      category TEXT,
      tags TEXT,
      status TEXT DEFAULT 'draft',
      read_time TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

async function seed() {
  try {
    createTables();

    const adminPassword = await bcrypt.hash('Admin@1122', 12);
    db.prepare(`INSERT OR REPLACE INTO users (id, email, name, password, role, permissions, social_logins, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`)
      .run(
        1,
        'admin@administrator.serve',
        'Administrator',
        adminPassword,
        'admin',
        JSON.stringify(['*']),
        JSON.stringify([]),
        now(),
        now()
      );

    db.prepare(`INSERT OR REPLACE INTO company_settings (
      id, name, tagline, description, logo, website, email, phone,
      address_street, address_city, address_state, address_zip, address_country,
      social_github, social_linkedin, social_twitter, social_facebook, social_instagram, social_youtube,
      founded, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      1,
      'ZXCentra',
      'Innovating Tomorrow\'s Technology Today',
      'Leading provider of cutting-edge software solutions and digital transformation services for businesses worldwide.',
      'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      'https://zxcentra.com',
      'contact@zxcentra.com',
      '+1 (555) 123-4567',
      '123 Innovation Drive',
      'San Francisco',
      'CA',
      '94105',
      'USA',
      'https://github.com/zxcentra',
      'https://linkedin.com/company/zxcentra',
      'https://twitter.com/techflow_sol',
      'https://facebook.com/zxcentra',
      'https://instagram.com/zxcentra',
      'https://youtube.com/c/zxcentra',
      '2025',
      now()
    );

    const insertProduct = db.prepare(`INSERT OR REPLACE INTO products
      (id, name, description, icon, image, features, price, category, status, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
    const products = [
      {
        id: 1,
        name: 'CloudSync Pro',
        description: 'Enterprise-grade cloud synchronization platform...',
        icon: 'Cloud',
        image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg',
        features: ['Real-time sync', 'Enterprise security', 'API integration', '24/7 support'],
        price: '$99/month',
        category: 'Cloud Solutions',
        status: 'active'
      },
      {
        id: 2,
        name: 'DataFlow Analytics',
        description: 'Advanced analytics platform with AI-powered insights.',
        icon: 'BarChart3',
        image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg',
        features: ['AI insights', 'Custom dashboards', 'Real-time monitoring', 'Export tools'],
        price: '$149/month',
        category: 'Analytics',
        status: 'active'
      }
    ];
    products.forEach(p =>
      insertProduct.run(p.id, p.name, p.description, p.icon, p.image, JSON.stringify(p.features), p.price, p.category, p.status, now(), now())
    );

    const insertService = db.prepare(`INSERT OR REPLACE INTO services
      (id, name, description, icon, image, deliverables, category, status, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
    const services = [
      {
        id: 1,
        name: 'Digital Transformation',
        description: 'Modernize operations and improve efficiency.',
        icon: 'Zap',
        image: 'https://images.pexels.com/photos/3184297/pexels-photo-3184297.jpeg',
        deliverables: ['Strategy consultation', 'Technology audit', 'Implementation plan', 'Training & support'],
        category: 'Consulting',
        status: 'active'
      }
    ];
    services.forEach(s =>
      insertService.run(s.id, s.name, s.description, s.icon, s.image, JSON.stringify(s.deliverables), s.category, s.status, now(), now())
    );

    const insertCategory = db.prepare(`INSERT OR REPLACE INTO blog_categories (id, name, slug, description, created_at)
                                       VALUES (?, ?, ?, ?, ?)`);
    const blogCategories = [
      { id: 1, name: 'Cloud Computing', slug: 'cloud-computing', description: 'Latest in cloud tech' },
      { id: 2, name: 'Security', slug: 'security', description: 'Cybersecurity best practices' }
    ];
    blogCategories.forEach(c => insertCategory.run(c.id, c.name, c.slug, c.description, now()));

    const insertPost = db.prepare(`INSERT OR REPLACE INTO blog_posts
      (id, title, slug, excerpt, content, image, author_id, category, tags, status, read_time, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
    const blogPosts = [
      {
        id: 1,
        title: 'The Future of Cloud Computing',
        slug: 'future-cloud-computing',
        excerpt: 'Explore trends shaping cloud in 2024',
        content: '<h2>Cloud Outlook</h2><p>Cloud evolves fast...</p>',
        image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg',
        author_id: 1,
        category: 'Cloud Computing',
        tags: ['cloud', 'trends', '2024'],
        status: 'published',
        read_time: '5 min read'
      }
    ];
    blogPosts.forEach(p =>
      insertPost.run(p.id, p.title, p.slug, p.excerpt, p.content, p.image, p.author_id, p.category, JSON.stringify(p.tags), p.status, p.read_time, now(), now())
    );

    console.log('✅ Database seeded successfully.');
  } catch (err) {
    console.error('❌ Error seeding database:', err);
  } finally {
    db.close();
  }
}

seed();

const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const path = require('path');

const dbPath = path.join(process.cwd(), 'data', 'database.db');
const db = new Database(dbPath);

async function seedDatabase() {
  try {
    // Seed admin user
    const hashedPassword = await bcrypt.hash('Admin@1122', 12);
    
    const insertUser = db.prepare(`
      INSERT OR REPLACE INTO users (id, email, name, password, role, permissions)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    
    insertUser.run(1, 'admin@administrator.serve', 'Administrator', hashedPassword, 'admin', JSON.stringify(['*']));

    // Seed company settings
    const insertCompany = db.prepare(`
      INSERT OR REPLACE INTO company_settings (
        id, name, tagline, description, logo, website, email, phone,
        address_street, address_city, address_state, address_zip, address_country,
        social_github, social_linkedin, social_twitter, social_facebook, social_instagram, social_youtube,
        founded
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertCompany.run(
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
      '2025'
    );

    // Seed products
    const insertProduct = db.prepare(`
      INSERT OR REPLACE INTO products (id, name, description, icon, image, features, price, category)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const products = [
      {
        id: 1,
        name: 'CloudSync Pro',
        description: 'Enterprise-grade cloud synchronization platform with real-time data processing and advanced security features.',
        icon: 'Cloud',
        image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=400',
        features: JSON.stringify(['Real-time sync', 'Enterprise security', 'API integration', '24/7 support']),
        price: '$99/month',
        category: 'Cloud Solutions'
      },
      {
        id: 2,
        name: 'DataFlow Analytics',
        description: 'Advanced analytics platform that transforms raw data into actionable business insights with AI-powered recommendations.',
        icon: 'BarChart3',
        image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400',
        features: JSON.stringify(['AI insights', 'Custom dashboards', 'Real-time monitoring', 'Export tools']),
        price: '$149/month',
        category: 'Analytics'
      },
      {
        id: 3,
        name: 'SecureConnect VPN',
        description: 'Military-grade VPN solution designed for businesses requiring maximum security and privacy protection.',
        icon: 'Shield',
        image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=400',
        features: JSON.stringify(['Zero-log policy', 'Global servers', 'Kill switch', 'Multi-device support']),
        price: '$79/month',
        category: 'Security'
      }
    ];

    products.forEach(product => {
      insertProduct.run(
        product.id,
        product.name,
        product.description,
        product.icon,
        product.image,
        product.features,
        product.price,
        product.category
      );
    });

    // Seed services
    const insertService = db.prepare(`
      INSERT OR REPLACE INTO services (id, name, description, icon, image, deliverables, category)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const services = [
      {
        id: 1,
        name: 'Digital Transformation',
        description: 'Complete digital transformation services to modernize your business operations and improve efficiency.',
        icon: 'Zap',
        image: 'https://images.pexels.com/photos/3184297/pexels-photo-3184297.jpeg?auto=compress&cs=tinysrgb&w=400',
        deliverables: JSON.stringify(['Strategy consultation', 'Technology audit', 'Implementation plan', 'Training & support']),
        category: 'Consulting'
      },
      {
        id: 2,
        name: 'Custom Software Development',
        description: 'Tailored software solutions built to meet your specific business requirements and objectives.',
        icon: 'Code',
        image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=400',
        deliverables: JSON.stringify(['Requirements analysis', 'UI/UX design', 'Development', 'Testing & deployment']),
        category: 'Development'
      },
      {
        id: 3,
        name: 'Cloud Migration',
        description: 'Seamless migration of your infrastructure to the cloud with minimal downtime and maximum security.',
        icon: 'Upload',
        image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=400',
        deliverables: JSON.stringify(['Migration assessment', 'Architecture design', 'Data migration', 'Optimization']),
        category: 'Cloud Services'
      }
    ];

    services.forEach(service => {
      insertService.run(
        service.id,
        service.name,
        service.description,
        service.icon,
        service.image,
        service.deliverables,
        service.category
      );
    });

    // Seed blog categories
    const insertCategory = db.prepare(`
      INSERT OR REPLACE INTO blog_categories (id, name, slug, description)
      VALUES (?, ?, ?, ?)
    `);

    const categories = [
      { id: 1, name: 'Cloud Computing', slug: 'cloud-computing', description: 'Latest trends and insights in cloud technology' },
      { id: 2, name: 'Digital Transformation', slug: 'digital-transformation', description: 'Digital transformation strategies and case studies' },
      { id: 3, name: 'Security', slug: 'security', description: 'Cybersecurity best practices and solutions' },
      { id: 4, name: 'Artificial Intelligence', slug: 'artificial-intelligence', description: 'AI and machine learning innovations' },
      { id: 5, name: 'Software Development', slug: 'software-development', description: 'Development practices and technologies' },
      { id: 6, name: 'Business Strategy', slug: 'business-strategy', description: 'Strategic insights for business growth' }
    ];

    categories.forEach(category => {
      insertCategory.run(category.id, category.name, category.slug, category.description);
    });

    // Seed blog posts
    const insertBlogPost = db.prepare(`
      INSERT OR REPLACE INTO blog_posts (
        id, title, slug, excerpt, content, image, author_id, category, tags, status, read_time
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const blogPosts = [
      {
        id: 1,
        title: 'The Future of Cloud Computing: Trends to Watch in 2024',
        slug: 'future-cloud-computing-trends-2024',
        excerpt: 'Explore the emerging trends in cloud computing that will shape the industry in the coming year.',
        content: `<h2>Introduction</h2><p>Cloud computing continues to evolve at a rapid pace, with new technologies and approaches emerging regularly. As we look ahead to 2024, several key trends are poised to reshape how businesses leverage cloud infrastructure.</p><h2>Key Trends</h2><p>From edge computing to serverless architectures, the cloud landscape is becoming more sophisticated and specialized. Organizations are increasingly adopting multi-cloud strategies to avoid vendor lock-in and optimize performance.</p><h2>Conclusion</h2><p>Staying ahead of these trends will be crucial for businesses looking to maintain their competitive edge in the digital economy.</p>`,
        image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=600',
        author_id: 1,
        category: 'Cloud Computing',
        tags: JSON.stringify(['cloud', 'trends', '2024', 'technology']),
        status: 'published',
        read_time: '5 min read'
      },
      {
        id: 2,
        title: 'Digital Transformation Success Stories: Real-World Case Studies',
        slug: 'digital-transformation-success-stories',
        excerpt: 'Learn from companies that have successfully navigated their digital transformation journey.',
        content: `<h2>Case Study 1: Manufacturing Giant</h2><p>A leading manufacturing company transformed their operations by implementing IoT sensors and AI-powered analytics, resulting in 30% improved efficiency.</p><h2>Case Study 2: Retail Revolution</h2><p>A traditional retailer embraced e-commerce and omnichannel strategies, increasing their revenue by 150% within two years.</p><h2>Key Takeaways</h2><p>Successful digital transformation requires strong leadership, clear vision, and employee buy-in at all levels.</p>`,
        image: 'https://images.pexels.com/photos/3184297/pexels-photo-3184297.jpeg?auto=compress&cs=tinysrgb&w=600',
        author_id: 1,
        category: 'Digital Transformation',
        tags: JSON.stringify(['digital transformation', 'case studies', 'success stories']),
        status: 'published',
        read_time: '8 min read'
      },
      {
        id: 3,
        title: 'Cybersecurity Best Practices for Modern Businesses',
        slug: 'cybersecurity-best-practices-modern-businesses',
        excerpt: 'Essential security measures every business should implement to protect their digital assets.',
        content: `<h2>The Current Threat Landscape</h2><p>Cyber threats are becoming more sophisticated and frequent. Businesses of all sizes are at risk and must take proactive measures to protect themselves.</p><h2>Essential Security Measures</h2><ul><li>Multi-factor authentication</li><li>Regular security audits</li><li>Employee training programs</li><li>Incident response planning</li></ul><h2>Building a Security Culture</h2><p>Security is everyone's responsibility. Creating a culture of security awareness is crucial for long-term protection.</p>`,
        image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=600',
        author_id: 1,
        category: 'Security',
        tags: JSON.stringify(['cybersecurity', 'best practices', 'business security']),
        status: 'published',
        read_time: '6 min read'
      }
    ];

    blogPosts.forEach(post => {
      insertBlogPost.run(
        post.id,
        post.title,
        post.slug,
        post.excerpt,
        post.content,
        post.image,
        post.author_id,
        post.category,
        post.tags,
        post.status,
        post.read_time
      );
    });

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Database seeding failed:', error);
    process.exit(1);
  } finally {
    db.close();
  }
}

seedDatabase();
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const dataDir = path.join(process.cwd(), 'data');
const dbFile = path.join(dataDir, 'database.json');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

async function seed() {
  try {
    const now = new Date().toISOString();
    const adminPassword = await bcrypt.hash('Admin@1122', 12);

    const initialData = {
      users: [
        {
          id: 1,
          email: 'admin@administrator.serve',
          name: 'Administrator',
          password: adminPassword,
          role: 'admin',
          permissions: ['*'],
          social_logins: [],
          avatar: null,
          created_at: now,
          updated_at: now
        }
      ],
      company_settings: [
        {
          id: 1,
          name: 'Zxentra',
          tagline: 'Innovating Tomorrow\'s Technology Today',
          description: 'Leading provider of cutting-edge software solutions and digital transformation services for businesses worldwide.',
          logo: '/logo.svg',
          website: 'https://zxentra.com',
          email: 'contact@zxentra.com',
          phone: '+91 8237308228',
          address_street: '123 Innovation Drive',
          address_city: 'San Francisco',
          address_state: 'CA',
          address_zip: '94105',
          address_country: 'USA',
          social_linkedin: 'https://linkedin.com/company/zxentra',
          social_twitter: 'https://twitter.com/zxentra',
          social_facebook: 'https://facebook.com/zxentra',
          social_instagram: 'https://instagram.com/zxentra',
          social_youtube: 'https://youtube.com/c/zxentra',
          founded: '2025',
          updated_at: now
        }
      ],
      products: [
        {
          id: 1,
          name: 'CloudSync Pro',
          description: 'Enterprise-grade cloud synchronization platform that seamlessly integrates with your existing infrastructure. Boost productivity with real-time collaboration and advanced security features.',
          icon: 'Cloud',
          image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800',
          features: ['Real-time synchronization', 'Enterprise security', 'API integration', '24/7 support', 'Multi-platform compatibility'],
          price: '$99/month',
          category: 'Cloud Solutions',
          status: 'active',
          created_at: now,
          updated_at: now
        },
        {
          id: 2,
          name: 'DataFlow Analytics',
          description: 'Advanced analytics platform with AI-powered insights that transform your data into actionable business intelligence. Make data-driven decisions with confidence.',
          icon: 'BarChart3',
          image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
          features: ['AI-powered insights', 'Custom dashboards', 'Real-time monitoring', 'Export tools', 'Predictive analytics'],
          price: '$149/month',
          category: 'Analytics',
          status: 'active',
          created_at: now,
          updated_at: now
        },
        {
          id: 3,
          name: 'SecureVault Enterprise',
          description: 'Military-grade security solution for enterprise data protection. Safeguard your sensitive information with advanced encryption and access controls.',
          icon: 'Shield',
          image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800',
          features: ['Military-grade encryption', 'Access controls', 'Audit trails', 'Compliance reporting', 'Zero-trust architecture'],
          price: '$199/month',
          category: 'Security',
          status: 'active',
          created_at: now,
          updated_at: now
        }
      ],
      services: [
        {
          id: 1,
          name: 'Full-Stack Development',
          description: 'Complete web application development from frontend to backend with responsive design and modern technologies.',
          icon: 'Code',
          image: 'https://images.pexels.com/photos/1181472/pexels-photo-1181472.jpeg?auto=compress&cs=tinysrgb&w=800',
          deliverables: ['Web Application Design & Development (Frontend + Backend)', 'Responsive & Accessible UI/UX Design', 'API Development & Integration'],
          category: 'Development',
          status: 'active',
          created_at: now,
          updated_at: now
        },
        {
          id: 2,
          name: 'Mobile App Development',
          description: 'Native and cross-platform mobile applications for Android and iOS with optimal performance and user experience.',
          icon: 'Smartphone',
          image: 'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800',
          deliverables: ['Android & iOS App Development', 'Cross-Platform Solutions (Flutter, React Native)', 'App Optimization & Maintenance'],
          category: 'Mobile',
          status: 'active',
          created_at: now,
          updated_at: now
        },
        {
          id: 3,
          name: 'Software Development',
          description: 'Custom desktop applications and enterprise software solutions tailored to your business needs.',
          icon: 'Monitor',
          image: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800',
          deliverables: ['Custom Desktop Applications', 'Enterprise Software Solutions', 'Productivity & Workflow Tools'],
          category: 'Software',
          status: 'active',
          created_at: now,
          updated_at: now
        },
        {
          id: 4,
          name: 'Automation Solutions',
          description: 'Streamline your business processes with intelligent automation and robotic process automation.',
          icon: 'Bot',
          image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
          deliverables: ['Business Process Automation', 'RPA (Robotic Process Automation)', 'Automated Testing & Deployment Pipelines'],
          category: 'Automation',
          status: 'active',
          created_at: now,
          updated_at: now
        },
        {
          id: 5,
          name: 'Cybersecurity Solutions',
          description: 'Comprehensive security services to protect your digital assets and ensure compliance.',
          icon: 'Shield',
          image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800',
          deliverables: ['Penetration Testing & Vulnerability Assessment', 'Security Audits & Compliance', 'Secure Software & Network Architecture'],
          category: 'Security',
          status: 'active',
          created_at: now,
          updated_at: now
        },
        {
          id: 6,
          name: 'Cloud Development',
          description: 'Cloud-native applications and infrastructure solutions for scalable and reliable systems.',
          icon: 'Cloud',
          image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800',
          deliverables: ['Cloud-Native App Development', 'AWS / Azure / Google Cloud Solutions', 'DevOps & CI/CD Pipelines'],
          category: 'Cloud',
          status: 'active',
          created_at: now,
          updated_at: now
        },
        {
          id: 7,
          name: 'AI Integration & Solutions',
          description: 'Artificial intelligence and machine learning solutions to enhance your business capabilities.',
          icon: 'Brain',
          image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
          deliverables: ['AI/ML Model Integration', 'Chatbots, Recommendation Systems', 'Intelligent Automation & Predictive Analytics'],
          category: 'AI/ML',
          status: 'active',
          created_at: now,
          updated_at: now
        },
        {
          id: 8,
          name: 'Infrastructure Management',
          description: 'Complete infrastructure setup, monitoring, and maintenance for optimal performance.',
          icon: 'Server',
          image: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=800',
          deliverables: ['Server Setup & Maintenance', 'Monitoring & Scaling Solutions', 'Network & Data Center Management'],
          category: 'Infrastructure',
          status: 'active',
          created_at: now,
          updated_at: now
        },
        {
          id: 9,
          name: 'Graphic Design',
          description: 'Creative design services for branding, UI/UX, and digital assets.',
          icon: 'Palette',
          image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
          deliverables: ['Logo, Branding & Identity', 'UI/UX Design', 'Digital Assets for Web & Mobile'],
          category: 'Design',
          status: 'active',
          created_at: now,
          updated_at: now
        },
        {
          id: 10,
          name: 'Game Development',
          description: '2D and 3D game development with immersive experiences across platforms.',
          icon: 'Gamepad2',
          image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800',
          deliverables: ['2D/3D Game Design & Development', 'Audio-Based Game Experiences', 'Cross-Platform Deployment'],
          category: 'Gaming',
          status: 'active',
          created_at: now,
          updated_at: now
        },
        {
          id: 11,
          name: 'Backend Development',
          description: 'Robust backend systems with microservices architecture and optimized databases.',
          icon: 'Database',
          image: 'https://images.pexels.com/photos/1181472/pexels-photo-1181472.jpeg?auto=compress&cs=tinysrgb&w=800',
          deliverables: ['Microservices Architecture', 'Database Design & Optimization', 'Secure & Scalable Server-Side Logic'],
          category: 'Backend',
          status: 'active',
          created_at: now,
          updated_at: now
        }
      ],
      blog_categories: [
        {
          id: 1,
          name: 'Cloud Computing',
          slug: 'cloud-computing',
          description: 'Latest trends and insights in cloud technology',
          created_at: now
        },
        {
          id: 2,
          name: 'Cybersecurity',
          slug: 'cybersecurity',
          description: 'Security best practices and threat intelligence',
          created_at: now
        },
        {
          id: 3,
          name: 'Digital Transformation',
          slug: 'digital-transformation',
          description: 'Strategies for successful digital transformation',
          created_at: now
        },
        {
          id: 4,
          name: 'AI & Machine Learning',
          slug: 'ai-machine-learning',
          description: 'Artificial intelligence and machine learning insights',
          created_at: now
        }
      ],
      blog_posts: [
        {
          id: 1,
          title: 'The Future of Cloud Computing in 2025',
          slug: 'future-cloud-computing-2025',
          excerpt: 'Explore the emerging trends and technologies that will shape cloud computing in 2025 and beyond.',
          content: '<h2>The Evolution of Cloud Technology</h2><p>Cloud computing continues to evolve at a rapid pace, with new innovations emerging every year. In 2025, we expect to see significant advancements in edge computing, serverless architectures, and AI-driven cloud services.</p><h3>Key Trends to Watch</h3><ul><li>Edge computing integration</li><li>Serverless-first architectures</li><li>AI-powered cloud optimization</li><li>Enhanced security measures</li></ul><p>Organizations that embrace these trends will gain a competitive advantage in the digital marketplace.</p>',
          image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800',
          author_id: 1,
          category: 'Cloud Computing',
          tags: ['cloud', 'trends', '2025', 'technology'],
          status: 'published',
          read_time: '5 min read',
          created_at: now,
          updated_at: now
        },
        {
          id: 2,
          title: 'Cybersecurity Best Practices for Remote Teams',
          slug: 'cybersecurity-best-practices-remote-teams',
          excerpt: 'Essential security measures to protect your organization when employees work from anywhere.',
          content: '<h2>Securing the Remote Workforce</h2><p>With remote work becoming the norm, organizations must adapt their cybersecurity strategies to protect distributed teams and assets.</p><h3>Essential Security Measures</h3><ul><li>Multi-factor authentication</li><li>VPN implementation</li><li>Regular security training</li><li>Endpoint protection</li></ul><p>A comprehensive security strategy is crucial for maintaining business continuity in a remote work environment.</p>',
          image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800',
          author_id: 1,
          category: 'Cybersecurity',
          tags: ['security', 'remote-work', 'best-practices'],
          status: 'published',
          read_time: '7 min read',
          created_at: now,
          updated_at: now
        },
        {
          id: 3,
          title: 'Digital Transformation: A Strategic Approach',
          slug: 'digital-transformation-strategic-approach',
          excerpt: 'Learn how to develop and execute a successful digital transformation strategy for your organization.',
          content: '<h2>Building a Digital-First Organization</h2><p>Digital transformation is more than just adopting new technologies—it\'s about fundamentally changing how your organization operates and delivers value to customers.</p><h3>Key Success Factors</h3><ul><li>Leadership commitment</li><li>Cultural change management</li><li>Technology integration</li><li>Continuous improvement</li></ul><p>Organizations that approach digital transformation strategically are more likely to achieve lasting success.</p>',
          image: 'https://images.pexels.com/photos/3184297/pexels-photo-3184297.jpeg?auto=compress&cs=tinysrgb&w=800',
          author_id: 1,
          category: 'Digital Transformation',
          tags: ['digital-transformation', 'strategy', 'business'],
          status: 'published',
          read_time: '6 min read',
          created_at: now,
          updated_at: now
        }
      ],
      email_settings: [],
      contact_submissions: [],
      testimonials: [
        {
          id: 1,
          name: 'Sarah Johnson',
          position: 'CTO',
          company: 'TechCorp Inc.',
          content: 'Zxentra delivered exceptional results on our cloud migration project. Their expertise and professionalism exceeded our expectations.',
          rating: 5,
          image: 'https://images.pexels.com/photos/3184344/pexels-photo-3184344.jpeg?auto=compress&cs=tinysrgb&w=300',
          status: 'active',
          created_at: now,
          updated_at: now
        },
        {
          id: 2,
          name: 'Michael Chen',
          position: 'CEO',
          company: 'StartupXYZ',
          content: 'The mobile app they developed for us has been a game-changer. User engagement increased by 300% after launch.',
          rating: 5,
          image: 'https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=300',
          status: 'active',
          created_at: now,
          updated_at: now
        },
        {
          id: 3,
          name: 'Emily Rodriguez',
          position: 'Product Manager',
          company: 'InnovateLabs',
          content: 'Outstanding AI integration work. The recommendation system they built has significantly improved our customer experience.',
          rating: 5,
          image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=300',
          status: 'active',
          created_at: now,
          updated_at: now
        }
      ],
      faqs: [
        {
          id: 1,
          question: 'What services does Zxentra offer?',
          answer: 'We offer a comprehensive range of technology services including full-stack development, mobile app development, cloud solutions, AI integration, cybersecurity, and more. Our team specializes in delivering custom solutions tailored to your business needs.',
          category: 'General',
          order: 1,
          status: 'active',
          created_at: now,
          updated_at: now
        },
        {
          id: 2,
          question: 'How long does a typical project take?',
          answer: 'Project timelines vary depending on complexity and scope. Simple websites may take 2-4 weeks, while complex enterprise applications can take 3-6 months. We provide detailed timelines during our initial consultation.',
          category: 'Projects',
          order: 2,
          status: 'active',
          created_at: now,
          updated_at: now
        },
        {
          id: 3,
          question: 'Do you provide ongoing support and maintenance?',
          answer: 'Yes, we offer comprehensive support and maintenance packages for all our solutions. This includes regular updates, security patches, performance monitoring, and technical support.',
          category: 'Support',
          order: 3,
          status: 'active',
          created_at: now,
          updated_at: now
        },
        {
          id: 4,
          question: 'What technologies do you work with?',
          answer: 'We work with a wide range of modern technologies including React, Node.js, Python, Flutter, AWS, Azure, Docker, Kubernetes, and many more. We choose the best technology stack for each project.',
          category: 'Technical',
          order: 4,
          status: 'active',
          created_at: now,
          updated_at: now
        },
        {
          id: 5,
          question: 'How do you ensure project quality?',
          answer: 'We follow industry best practices including code reviews, automated testing, continuous integration, and regular client feedback sessions. Quality assurance is integrated throughout our development process.',
          category: 'Quality',
          order: 5,
          status: 'active',
          created_at: now,
          updated_at: now
        }
      ]
    };

    fs.writeFileSync(dbFile, JSON.stringify(initialData, null, 2));
    console.log('✅ Database seeded successfully with updated data.');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seed();
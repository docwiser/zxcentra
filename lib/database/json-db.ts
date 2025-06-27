import fs from 'fs';
import path from 'path';

export interface DatabaseSchema {
  users: any[];
  company_settings: any[];
  products: any[];
  services: any[];
  blog_posts: any[];
  blog_categories: any[];
  email_settings: any[];
  contact_submissions: any[];
  testimonials: any[];
  faqs: any[];
}

class JsonDatabase {
  private dataDir: string;
  private dbFile: string;

  constructor() {
    this.dataDir = path.join(process.cwd(), 'data');
    this.dbFile = path.join(this.dataDir, 'database.json');
    this.ensureDataDir();
    this.initializeDatabase();
  }

  private ensureDataDir() {
    if (!fs.existsSync(this.dataDir)) {
      fs.mkdirSync(this.dataDir, { recursive: true });
    }
  }

  private initializeDatabase() {
    if (!fs.existsSync(this.dbFile)) {
      const initialData: DatabaseSchema = {
        users: [],
        company_settings: [],
        products: [],
        services: [],
        blog_posts: [],
        blog_categories: [],
        email_settings: [],
        contact_submissions: [],
        testimonials: [],
        faqs: []
      };
      this.writeData(initialData);
    }
  }

  private readData(): DatabaseSchema {
    try {
      const data = fs.readFileSync(this.dbFile, 'utf8');
      const parsedData = JSON.parse(data);
      
      // Ensure all required tables exist as arrays
      const defaultData: DatabaseSchema = {
        users: [],
        company_settings: [],
        products: [],
        services: [],
        blog_posts: [],
        blog_categories: [],
        email_settings: [],
        contact_submissions: [],
        testimonials: [],
        faqs: []
      };

      // Merge with default data to ensure all tables exist
      return {
        ...defaultData,
        ...parsedData,
        // Ensure each table is an array
        users: Array.isArray(parsedData.users) ? parsedData.users : [],
        company_settings: Array.isArray(parsedData.company_settings) ? parsedData.company_settings : [],
        products: Array.isArray(parsedData.products) ? parsedData.products : [],
        services: Array.isArray(parsedData.services) ? parsedData.services : [],
        blog_posts: Array.isArray(parsedData.blog_posts) ? parsedData.blog_posts : [],
        blog_categories: Array.isArray(parsedData.blog_categories) ? parsedData.blog_categories : [],
        email_settings: Array.isArray(parsedData.email_settings) ? parsedData.email_settings : [],
        contact_submissions: Array.isArray(parsedData.contact_submissions) ? parsedData.contact_submissions : [],
        testimonials: Array.isArray(parsedData.testimonials) ? parsedData.testimonials : [],
        faqs: Array.isArray(parsedData.faqs) ? parsedData.faqs : []
      };
    } catch (error) {
      console.error('Error reading database:', error);
      return {
        users: [],
        company_settings: [],
        products: [],
        services: [],
        blog_posts: [],
        blog_categories: [],
        email_settings: [],
        contact_submissions: [],
        testimonials: [],
        faqs: []
      };
    }
  }

  private writeData(data: DatabaseSchema) {
    try {
      fs.writeFileSync(this.dbFile, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error writing database:', error);
    }
  }

  // Generic CRUD operations
  findAll<T>(table: keyof DatabaseSchema): T[] {
    const data = this.readData();
    const tableData = data[table];
    return Array.isArray(tableData) ? tableData as T[] : [];
  }

  findById<T>(table: keyof DatabaseSchema, id: number): T | undefined {
    const data = this.readData();
    const tableData = data[table];
    if (!Array.isArray(tableData)) return undefined;
    return tableData.find(item => item.id === id);
  }

  findOne<T>(table: keyof DatabaseSchema, query: Partial<T>): T | undefined {
    const data = this.readData();
    const tableData = data[table];
    if (!Array.isArray(tableData)) return undefined;
    
    return (tableData as T[]).find(item => {
      return Object.entries(query).every(([key, value]) => 
        (item as any)[key] === value
      );
    });
  }

  findMany<T>(table: keyof DatabaseSchema, query: Partial<T>): T[] {
    const data = this.readData();
    const tableData = data[table];
    if (!Array.isArray(tableData)) return [];
    
    return (tableData as T[]).filter(item => {
      return Object.entries(query).every(([key, value]) => 
        (item as any)[key] === value
      );
    });
  }

  create<T>(table: keyof DatabaseSchema, item: Omit<T, 'id' | 'created_at' | 'updated_at'>): T {
    const data = this.readData();
    const tableData = data[table];
    const items = Array.isArray(tableData) ? tableData : [];
    const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
    
    const newItem = {
      ...item,
      id: newId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    items.push(newItem);
    data[table] = items as any;
    this.writeData(data);
    return newItem as T;
  }

  update<T>(table: keyof DatabaseSchema, id: number, updates: Partial<T>): T | null {
    const data = this.readData();
    const tableData = data[table];
    const items = Array.isArray(tableData) ? tableData : [];
    const index = items.findIndex(item => item.id === id);
    
    if (index === -1) return null;

    items[index] = {
      ...items[index],
      ...updates,
      updated_at: new Date().toISOString()
    };

    data[table] = items as any;
    this.writeData(data);
    return items[index] as T;
  }

  delete(table: keyof DatabaseSchema, id: number): boolean {
    const data = this.readData();
    const tableData = data[table];
    const items = Array.isArray(tableData) ? tableData : [];
    const index = items.findIndex(item => item.id === id);
    
    if (index === -1) return false;

    items.splice(index, 1);
    data[table] = items as any;
    this.writeData(data);
    return true;
  }

  // Special operations
  upsert<T>(table: keyof DatabaseSchema, item: any, uniqueField: string): T {
    const data = this.readData();
    const tableData = data[table];
    const items = Array.isArray(tableData) ? tableData : [];
    const existingIndex = items.findIndex(i => i[uniqueField] === item[uniqueField]);

    if (existingIndex !== -1) {
      items[existingIndex] = {
        ...items[existingIndex],
        ...item,
        updated_at: new Date().toISOString()
      };
      data[table] = items as any;
      this.writeData(data);
      return items[existingIndex] as T;
    } else {
      return this.create(table, item);
    }
  }

  count(table: keyof DatabaseSchema, query?: any): number {
    const data = this.readData();
    const tableData = data[table];
    const items = Array.isArray(tableData) ? tableData : [];
    
    if (!query) return items.length;
    
    return items.filter(item => {
      return Object.entries(query).every(([key, value]) => 
        item[key] === value
      );
    }).length;
  }
}

export const db = new JsonDatabase();
export default db;
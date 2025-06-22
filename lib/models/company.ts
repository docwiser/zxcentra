import db from '../database/json-db';

export interface CompanySettings {
  id: number;
  name: string;
  tagline: string;
  description: string;
  logo: string;
  website: string;
  email: string;
  phone: string;
  address_street: string;
  address_city: string;
  address_state: string;
  address_zip: string;
  address_country: string;
  social_github: string;
  social_linkedin: string;
  social_twitter: string;
  social_facebook: string;
  social_instagram: string;
  social_youtube: string;
  founded: string;
  updated_at: string;
}

export class CompanyModel {
  static getSettings(): CompanySettings | null {
    const settings = db.findAll<CompanySettings>('company_settings');
    return settings.length > 0 ? settings[0] : null;
  }

  static updateSettings(updates: Partial<CompanySettings>): CompanySettings | null {
    const existing = this.getSettings();
    
    if (existing) {
      return db.update<CompanySettings>('company_settings', existing.id, updates);
    } else {
      return db.create<CompanySettings>('company_settings', updates);
    }
  }
}
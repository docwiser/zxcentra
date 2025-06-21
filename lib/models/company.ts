import db from '../database';

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
    const stmt = db.prepare('SELECT * FROM company_settings WHERE id = 1');
    return stmt.get() as CompanySettings || null;
  }

  static updateSettings(updates: Partial<CompanySettings>): CompanySettings | null {
    const fields = [];
    const values = [];

    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined) {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    });

    fields.push('updated_at = CURRENT_TIMESTAMP');
    values.push(1);

    const stmt = db.prepare(`UPDATE company_settings SET ${fields.join(', ')} WHERE id = ?`);
    stmt.run(...values);

    return this.getSettings();
  }
}
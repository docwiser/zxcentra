export interface EmailSettings {
  id: number;
  smtp_host: string;
  smtp_port: number;
  smtp_user: string;
  smtp_password: string;
  smtp_secure: boolean;
  from_email: string;
  from_name: string;
  created_at: string;
  updated_at: string;
}

export interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  subject?: string;
  message: string;
  type: 'contact' | 'footer';
  status: 'new' | 'read' | 'replied';
  created_at: string;
  updated_at: string;
}

import db from '../database/json-db';

export class EmailModel {
  static getSettings(): EmailSettings | null {
    const settings = db.findAll<EmailSettings>('email_settings');
    return settings.length > 0 ? settings[0] : null;
  }

  static updateSettings(updates: Partial<EmailSettings>): EmailSettings {
    const existing = this.getSettings();
    
    if (existing) {
      return db.update<EmailSettings>('email_settings', existing.id, updates)!;
    } else {
      return db.create<EmailSettings>('email_settings', updates);
    }
  }

  static createContactSubmission(data: Partial<ContactSubmission>): ContactSubmission {
    return db.create<ContactSubmission>('contact_submissions', {
      ...data,
      status: 'new'
    });
  }

  static getAllContactSubmissions(): ContactSubmission[] {
    return db.findAll<ContactSubmission>('contact_submissions');
  }

  static updateContactSubmission(id: number, updates: Partial<ContactSubmission>): ContactSubmission | null {
    return db.update<ContactSubmission>('contact_submissions', id, updates);
  }

  static deleteContactSubmission(id: number): boolean {
    return db.delete('contact_submissions', id);
  }
}
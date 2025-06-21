import fs from 'fs';
import path from 'path';

export interface AuthSettings {
  enableGithub: boolean;
  enableGoogle: boolean;
  githubClientId: string;
  githubClientSecret: string;
  googleClientId: string;
  googleClientSecret: string;
}

export interface SiteSettings {
  auth: AuthSettings;
  company: any;
}

const settingsFilePath = path.join(process.cwd(), 'data', 'settings.json');

const defaultSettings: SiteSettings = {
  auth: {
    enableGithub: true,
    enableGoogle: true,
    githubClientId: process.env.GITHUB_ID || '',
    githubClientSecret: process.env.GITHUB_SECRET || '',
    googleClientId: process.env.GOOGLE_CLIENT_ID || '',
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  },
  company: {},
};

function getSettings(): SiteSettings {
  try {
    if (!fs.existsSync(settingsFilePath)) {
      fs.writeFileSync(settingsFilePath, JSON.stringify(defaultSettings, null, 2));
      return defaultSettings;
    }
    const data = fs.readFileSync(settingsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading settings file:', error);
    return defaultSettings;
  }
}

function saveSettings(settings: SiteSettings): void {
  try {
    fs.writeFileSync(settingsFilePath, JSON.stringify(settings, null, 2));
  } catch (error) {
    console.error('Error saving settings file:', error);
  }
}

export function getAuthSettings(): AuthSettings {
  const settings = getSettings();
  return settings.auth;
}

export function updateAuthSettings(authSettings: Partial<AuthSettings>): void {
  const settings = getSettings();
  settings.auth = { ...settings.auth, ...authSettings };
  saveSettings(settings);
}

export function updateCompanySettings(companyData: any): void {
  const settings = getSettings();
  settings.company = companyData;
  saveSettings(settings);
}

export { getSettings, saveSettings };
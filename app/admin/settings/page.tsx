'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { hasPermission } from '@/lib/permissions';
import { ArrowLeft, Save, Settings, Mail, Building } from 'lucide-react';
import Link from 'next/link';

export default function AdminSettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [companySettings, setCompanySettings] = useState({
    name: '',
    tagline: '',
    description: '',
    logo: '',
    website: '',
    email: '',
    phone: '',
    address_street: '',
    address_city: '',
    address_state: '',
    address_zip: '',
    address_country: '',
    social_linkedin: '',
    social_twitter: '',
    social_facebook: '',
    social_instagram: '',
    social_youtube: '',
    founded: ''
  });

  const [emailSettings, setEmailSettings] = useState({
    smtp_host: '',
    smtp_port: 587,
    smtp_user: '',
    smtp_password: '',
    smtp_secure: false,
    from_email: '',
    from_name: ''
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
      return;
    }

    if (session && !hasPermission(session.user.permissions, 'settings:read')) {
      router.push('/admin');
      return;
    }

    fetchSettings();
  }, [session, status, router]);

  const fetchSettings = async () => {
    try {
      const [companyRes, emailRes] = await Promise.all([
        fetch('/api/company/data'),
        fetch('/api/admin/email-settings')
      ]);

      if (companyRes.ok) {
        const companyData = await companyRes.json();
        setCompanySettings(companyData);
      }

      if (emailRes.ok) {
        const emailData = await emailRes.json();
        if (emailData) {
          setEmailSettings(emailData);
        }
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveCompanySettings = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/admin/company-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(companySettings)
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Company settings saved successfully!' });
      } else {
        throw new Error('Failed to save settings');
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save company settings' });
    } finally {
      setSaving(false);
    }
  };

  const saveEmailSettings = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/admin/email-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailSettings)
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Email settings saved successfully!' });
      } else {
        throw new Error('Failed to save settings');
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save email settings' });
    } finally {
      setSaving(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session || !hasPermission(session.user.permissions, 'settings:read')) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Button variant="ghost" asChild className="mb-4">
              <Link href="/admin">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Admin
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground">
              Manage your site configuration and preferences
            </p>
          </div>
        </div>

        {message.text && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' :
            'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {message.text}
          </div>
        )}

        <Tabs defaultValue="company" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="company">Company Settings</TabsTrigger>
            <TabsTrigger value="email">Email Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="company">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building className="h-5 w-5" />
                  <span>Company Information</span>
                </CardTitle>
                <CardDescription>
                  Update your company details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Company Name</label>
                    <Input
                      value={companySettings.name}
                      onChange={(e) => setCompanySettings(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Company Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Tagline</label>
                    <Input
                      value={companySettings.tagline}
                      onChange={(e) => setCompanySettings(prev => ({ ...prev, tagline: e.target.value }))}
                      placeholder="Company Tagline"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <Textarea
                    value={companySettings.description}
                    onChange={(e) => setCompanySettings(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Company Description"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Logo URL</label>
                    <Input
                      value={companySettings.logo}
                      onChange={(e) => setCompanySettings(prev => ({ ...prev, logo: e.target.value }))}
                      placeholder="https://example.com/logo.png"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Website</label>
                    <Input
                      value={companySettings.website}
                      onChange={(e) => setCompanySettings(prev => ({ ...prev, website: e.target.value }))}
                      placeholder="https://company.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input
                      type="email"
                      value={companySettings.email}
                      onChange={(e) => setCompanySettings(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="contact@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <Input
                      value={companySettings.phone}
                      onChange={(e) => setCompanySettings(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Street Address</label>
                  <Input
                    value={companySettings.address_street}
                    onChange={(e) => setCompanySettings(prev => ({ ...prev, address_street: e.target.value }))}
                    placeholder="123 Main Street"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">City</label>
                    <Input
                      value={companySettings.address_city}
                      onChange={(e) => setCompanySettings(prev => ({ ...prev, address_city: e.target.value }))}
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">State</label>
                    <Input
                      value={companySettings.address_state}
                      onChange={(e) => setCompanySettings(prev => ({ ...prev, address_state: e.target.value }))}
                      placeholder="State"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">ZIP Code</label>
                    <Input
                      value={companySettings.address_zip}
                      onChange={(e) => setCompanySettings(prev => ({ ...prev, address_zip: e.target.value }))}
                      placeholder="12345"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Country</label>
                    <Input
                      value={companySettings.address_country}
                      onChange={(e) => setCompanySettings(prev => ({ ...prev, address_country: e.target.value }))}
                      placeholder="Country"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">LinkedIn</label>
                    <Input
                      value={companySettings.social_linkedin}
                      onChange={(e) => setCompanySettings(prev => ({ ...prev, social_linkedin: e.target.value }))}
                      placeholder="https://linkedin.com/company/..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Twitter</label>
                    <Input
                      value={companySettings.social_twitter}
                      onChange={(e) => setCompanySettings(prev => ({ ...prev, social_twitter: e.target.value }))}
                      placeholder="https://twitter.com/..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Facebook</label>
                    <Input
                      value={companySettings.social_facebook}
                      onChange={(e) => setCompanySettings(prev => ({ ...prev, social_facebook: e.target.value }))}
                      placeholder="https://facebook.com/..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Instagram</label>
                    <Input
                      value={companySettings.social_instagram}
                      onChange={(e) => setCompanySettings(prev => ({ ...prev, social_instagram: e.target.value }))}
                      placeholder="https://instagram.com/..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">YouTube</label>
                    <Input
                      value={companySettings.social_youtube}
                      onChange={(e) => setCompanySettings(prev => ({ ...prev, social_youtube: e.target.value }))}
                      placeholder="https://youtube.com/..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Founded Year</label>
                  <Input
                    value={companySettings.founded}
                    onChange={(e) => setCompanySettings(prev => ({ ...prev, founded: e.target.value }))}
                    placeholder="2025"
                  />
                </div>

                <div className="flex justify-end">
                  <Button onClick={saveCompanySettings} disabled={saving}>
                    <Save className="mr-2 h-4 w-4" />
                    {saving ? 'Saving...' : 'Save Company Settings'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="email">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="h-5 w-5" />
                  <span>Email Configuration</span>
                </CardTitle>
                <CardDescription>
                  Configure SMTP settings for sending emails
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">SMTP Host</label>
                    <Input
                      value={emailSettings.smtp_host}
                      onChange={(e) => setEmailSettings(prev => ({ ...prev, smtp_host: e.target.value }))}
                      placeholder="smtp.gmail.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">SMTP Port</label>
                    <Input
                      type="number"
                      value={emailSettings.smtp_port}
                      onChange={(e) => setEmailSettings(prev => ({ ...prev, smtp_port: parseInt(e.target.value) }))}
                      placeholder="587"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">SMTP Username</label>
                    <Input
                      value={emailSettings.smtp_user}
                      onChange={(e) => setEmailSettings(prev => ({ ...prev, smtp_user: e.target.value }))}
                      placeholder="your-email@gmail.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">SMTP Password</label>
                    <Input
                      type="password"
                      value={emailSettings.smtp_password}
                      onChange={(e) => setEmailSettings(prev => ({ ...prev, smtp_password: e.target.value }))}
                      placeholder="Your app password"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    checked={emailSettings.smtp_secure}
                    onCheckedChange={(checked) => setEmailSettings(prev => ({ ...prev, smtp_secure: checked }))}
                  />
                  <label className="text-sm font-medium">Use SSL/TLS</label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">From Email</label>
                    <Input
                      type="email"
                      value={emailSettings.from_email}
                      onChange={(e) => setEmailSettings(prev => ({ ...prev, from_email: e.target.value }))}
                      placeholder="noreply@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">From Name</label>
                    <Input
                      value={emailSettings.from_name}
                      onChange={(e) => setEmailSettings(prev => ({ ...prev, from_name: e.target.value }))}
                      placeholder="Company Name"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={saveEmailSettings} disabled={saving}>
                    <Save className="mr-2 h-4 w-4" />
                    {saving ? 'Saving...' : 'Save Email Settings'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
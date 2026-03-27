import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Save, 
  Globe, 
  Mail, 
  Instagram, 
  Twitter, 
  Facebook, 
  Type,
  Layout
} from 'lucide-react';
import { SiteSettings } from '../../types';
import { cn } from '../../lib/utils';

const initialSettings: SiteSettings = {
  siteName: { id: 'Global Talent UI', en: 'Global Talent UI' },
  footerText: { 
    id: 'Membangun masa depan melalui kolaborasi riset global.', 
    en: 'Building the future through global research collaboration.' 
  },
  contactEmail: 'globaltalent@ui.ac.id',
  socialMedia: {
    instagram: 'https://instagram.com/univ_indonesia',
    twitter: 'https://twitter.com/univ_indonesia',
    facebook: 'https://facebook.com/univ.indonesia',
  }
};

export const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Site Settings</h2>
          <p className="text-gray-500">Manage global configurations for the Global Talent UI portal.</p>
        </div>
        {saveSuccess && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-green-100 text-green-700 px-4 py-2 rounded-xl text-sm font-bold flex items-center"
          >
            Settings saved successfully!
          </motion.div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-8 pb-12">
        {/* General Settings */}
        <section className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center">
            <Layout size={20} className="mr-3 text-yellow-600" />
            <h3 className="font-bold text-gray-900">General Information</h3>
          </div>
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Site Name (ID)</label>
                <input
                  value={settings.siteName.id}
                  onChange={e => setSettings(prev => ({ ...prev, siteName: { ...prev.siteName, id: e.target.value } }))}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Site Name (EN)</label>
                <input
                  value={settings.siteName.en}
                  onChange={e => setSettings(prev => ({ ...prev, siteName: { ...prev.siteName, en: e.target.value } }))}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Footer Text (ID)</label>
                <textarea
                  rows={3}
                  value={settings.footerText.id}
                  onChange={e => setSettings(prev => ({ ...prev, footerText: { ...prev.footerText, id: e.target.value } }))}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 outline-none transition-all resize-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Footer Text (EN)</label>
                <textarea
                  rows={3}
                  value={settings.footerText.en}
                  onChange={e => setSettings(prev => ({ ...prev, footerText: { ...prev.footerText, en: e.target.value } }))}
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 outline-none transition-all resize-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 flex items-center">
                <Mail size={16} className="mr-2 text-yellow-600" /> Contact Email
              </label>
              <input
                type="email"
                value={settings.contactEmail}
                onChange={e => setSettings(prev => ({ ...prev, contactEmail: e.target.value }))}
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 outline-none transition-all"
              />
            </div>
          </div>
        </section>

        {/* Social Media */}
        <section className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center">
            <Globe size={20} className="mr-3 text-yellow-600" />
            <h3 className="font-bold text-gray-900">Social Media Links</h3>
          </div>
          <div className="p-8 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-pink-50 text-pink-600 rounded-xl">
                  <Instagram size={20} />
                </div>
                <div className="flex-grow">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Instagram</label>
                  <input
                    value={settings.socialMedia.instagram}
                    onChange={e => setSettings(prev => ({ 
                      ...prev, 
                      socialMedia: { ...prev.socialMedia, instagram: e.target.value } 
                    }))}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 outline-none transition-all text-sm"
                    placeholder="https://instagram.com/..."
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-50 text-blue-400 rounded-xl">
                  <Twitter size={20} />
                </div>
                <div className="flex-grow">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Twitter / X</label>
                  <input
                    value={settings.socialMedia.twitter}
                    onChange={e => setSettings(prev => ({ 
                      ...prev, 
                      socialMedia: { ...prev.socialMedia, twitter: e.target.value } 
                    }))}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 outline-none transition-all text-sm"
                    placeholder="https://twitter.com/..."
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-50 text-blue-700 rounded-xl">
                  <Facebook size={20} />
                </div>
                <div className="flex-grow">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Facebook</label>
                  <input
                    value={settings.socialMedia.facebook}
                    onChange={e => setSettings(prev => ({ 
                      ...prev, 
                      socialMedia: { ...prev.socialMedia, facebook: e.target.value } 
                    }))}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 outline-none transition-all text-sm"
                    placeholder="https://facebook.com/..."
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className={cn(
              "px-12 py-4 rounded-2xl font-bold text-white transition-all flex items-center shadow-lg",
              isSaving ? "bg-gray-400 cursor-not-allowed" : "bg-yellow-600 hover:bg-yellow-700 shadow-yellow-600/20"
            )}
          >
            <Save size={20} className="mr-2" />
            {isSaving ? 'Saving Changes...' : 'Save All Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};

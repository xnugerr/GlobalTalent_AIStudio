import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import { ArrowRight, Bell, FileText, Globe, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HomeView: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="https://picsum.photos/seed/university/1920/1080"
            alt="University Background"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/40 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              {t('home.hero.title')}
            </h1>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              {t('home.hero.subtitle')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/register"
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-4 rounded-full font-bold transition-all flex items-center group"
              >
                {t('nav.register')}
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/announcements"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-full font-bold transition-all"
              >
                {t('nav.announcements')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureCard
              icon={<Bell className="text-yellow-600" size={32} />}
              title={t('nav.announcements')}
              description="Dapatkan informasi terbaru mengenai program dan kegiatan Global Talent UI."
            />
            <FeatureCard
              icon={<FileText className="text-yellow-600" size={32} />}
              title={t('nav.articles')}
              description="Baca artikel dan berita terkini seputar pencapaian akademik Universitas Indonesia."
            />
            <FeatureCard
              icon={<Users className="text-yellow-600" size={32} />}
              title={t('nav.register')}
              description="Daftarkan diri Anda untuk berpartisipasi dalam berbagai program unggulan kami."
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <StatItem label="Program" value="12+" />
            <StatItem label="Pendaftar" value="500+" />
            <StatItem label="Publikasi" value="150+" />
            <StatItem label="Fakultas" value="14" />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-gray-100">
    <div className="mb-6">{icon}</div>
    <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

const StatItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <div className="text-4xl font-bold text-gray-900 mb-2">{value}</div>
    <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">{label}</div>
  </div>
);

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import { BookOpen, ExternalLink, User } from 'lucide-react';
import { Publication } from '../types';

const mockPublications: Publication[] = [
  {
    id: '1',
    title: { id: 'Advanced Research in Sustainable Energy Systems', en: 'Advanced Research in Sustainable Energy Systems' },
    authors: 'John Doe, Jane Smith',
    journal: 'Journal of Sustainable Development',
    year: '2025',
    doi: '10.1000/jsd.2025.001',
    url: '#',
    createdAt: '2025-12-01T00:00:00Z',
  },
  {
    id: '2',
    title: { id: 'Global Trends in Higher Education Excellence', en: 'Global Trends in Higher Education Excellence' },
    authors: 'Robert Brown, Alice Wilson',
    journal: 'Education Review Quarterly',
    year: '2026',
    url: '#',
    createdAt: '2026-01-15T00:00:00Z',
  },
];

export const PublicationsView: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('nav.publications')}</h1>
          <p className="text-gray-600">Daftar publikasi ilmiah hasil riset Program Global Talent UI.</p>
        </motion.div>

        <div className="grid gap-6">
          {mockPublications.map((pub) => (
            <motion.div
              key={pub.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center gap-6"
            >
              <div className="bg-yellow-50 p-4 rounded-xl text-yellow-600">
                <BookOpen size={32} />
              </div>
              <div className="flex-grow">
                <h2 className="text-xl font-bold text-gray-900 mb-2">{pub.title[language]}</h2>
                <div className="flex flex-wrap items-center text-sm text-gray-500 gap-y-2">
                  <div className="flex items-center mr-6">
                    <User size={14} className="mr-1" />
                    {pub.authors}
                  </div>
                  <div className="mr-6 font-bold text-gray-700">{pub.journal}</div>
                  <div className="bg-gray-100 px-2 py-0.5 rounded text-xs font-bold uppercase">{pub.year}</div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <a
                  href={pub.url}
                  className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-colors"
                >
                  View Publication
                  <ExternalLink size={14} className="ml-2" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

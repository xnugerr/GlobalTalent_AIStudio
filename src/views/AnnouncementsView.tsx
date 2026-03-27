import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import { Calendar, FileText, Download } from 'lucide-react';
import { Announcement } from '../types';

const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: { id: 'Pembukaan Pendaftaran Program Global Talent UI 2026', en: 'Opening of Global Talent UI Program Registration 2026' },
    content: { id: 'Kami mengundang seluruh dosen dan peneliti untuk mendaftarkan diri...', en: 'We invite all lecturers and researchers to register...' },
    date: '2026-03-20',
    category: 'academic',
    pdfUrl: '#',
    createdAt: '2026-03-20T10:00:00Z',
  },
  {
    id: '2',
    title: { id: 'Workshop Penulisan Jurnal Internasional', en: 'International Journal Writing Workshop' },
    content: { id: 'Ikuti workshop intensif untuk meningkatkan kualitas publikasi ilmiah Anda.', en: 'Join our intensive workshop to improve the quality of your scientific publications.' },
    date: '2026-04-05',
    category: 'event',
    createdAt: '2026-03-22T14:30:00Z',
  },
];

export const AnnouncementsView: React.FC = () => {
  const { lang, t } = useLanguage();

  return (
    <div className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('nav.announcements')}</h1>
          <p className="text-gray-600">Informasi terbaru seputar program Global Talent UI Universitas Indonesia.</p>
        </motion.div>

        <div className="space-y-6">
          {mockAnnouncements.map((ann) => (
            <motion.div
              key={ann.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center text-sm text-yellow-600 font-bold uppercase tracking-wider mb-4">
                <Calendar size={16} className="mr-2" />
                {ann.date}
                <span className="mx-2 text-gray-300">•</span>
                <span className="bg-yellow-50 px-2 py-0.5 rounded">{ann.category}</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{ann.title[lang]}</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">{ann.content[lang]}</p>
              
              {ann.pdfUrl && (
                <a
                  href={ann.pdfUrl}
                  className="inline-flex items-center text-sm font-bold text-gray-900 hover:text-yellow-600 transition-colors"
                >
                  <Download size={18} className="mr-2" />
                  Download PDF
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import { Article } from '../types';

const mockArticles: Article[] = [
  {
    id: '1',
    title: { id: 'UI Menuju Top 100 Universitas Dunia', en: 'UI Towards Top 100 World Universities' },
    excerpt: { id: 'Strategi Universitas Indonesia dalam meningkatkan peringkat global...', en: 'Universitas Indonesia\'s strategy in improving global rankings...' },
    content: { id: '...', en: '...' },
    author: 'Admin',
    date: '2026-03-15',
    imageUrl: 'https://picsum.photos/seed/ui/800/400',
    createdAt: '2026-03-15T08:00:00Z',
  },
  {
    id: '2',
    title: { id: 'Inovasi Riset di Masa Depan', en: 'Future Research Innovation' },
    excerpt: { id: 'Bagaimana riset interdisipliner mengubah wajah akademik UI.', en: 'How interdisciplinary research is changing the face of UI academic.' },
    content: { id: '...', en: '...' },
    author: 'Editor',
    date: '2026-03-10',
    imageUrl: 'https://picsum.photos/seed/research/800/400',
    createdAt: '2026-03-10T09:00:00Z',
  },
];

export const ArticlesView: React.FC = () => {
  const { lang, t } = useLanguage();

  return (
    <div className="py-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('nav.articles')}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Berita dan artikel terbaru mengenai perkembangan riset dan akademik di Universitas Indonesia.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {mockArticles.map((article) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="group cursor-pointer"
            >
              <div className="aspect-video rounded-3xl overflow-hidden mb-6 bg-gray-100">
                <img
                  src={article.imageUrl}
                  alt={article.title[lang]}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex items-center text-xs font-bold text-yellow-600 uppercase tracking-widest mb-3">
                {article.date}
                <span className="mx-2 text-gray-300">•</span>
                {article.author}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-yellow-600 transition-colors">
                {article.title[lang]}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                {article.excerpt[lang]}
              </p>
              <div className="text-sm font-bold text-gray-900 border-b-2 border-yellow-600 inline-block pb-1">
                Read More
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import { Image as ImageIcon, Play, File } from 'lucide-react';

export const MediaView: React.FC = () => {
  const { t } = useLanguage();

  const mediaItems = [
    { id: 1, type: 'image', title: 'Global Talent UI Launch Event', url: 'https://picsum.photos/seed/event1/400/300' },
    { id: 2, type: 'image', title: 'Research Workshop 2026', url: 'https://picsum.photos/seed/event2/400/300' },
    { id: 3, type: 'video', title: 'Program Overview Video', url: 'https://picsum.photos/seed/video1/400/300' },
    { id: 4, type: 'image', title: 'International Conference', url: 'https://picsum.photos/seed/event3/400/300' },
    { id: 5, type: 'document', title: 'Annual Report 2025', url: 'https://picsum.photos/seed/doc1/400/300' },
    { id: 6, type: 'image', title: 'Campus Visit', url: 'https://picsum.photos/seed/event4/400/300' },
  ];

  return (
    <div className="py-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t('nav.media')}</h1>
          <p className="text-gray-600">Galeri foto, video, dan dokumen kegiatan Global Talent UI.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {mediaItems.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -5 }}
              className="group relative rounded-3xl overflow-hidden bg-gray-100 aspect-[4/3]"
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="flex items-center text-white mb-2">
                  {item.type === 'image' && <ImageIcon size={18} className="mr-2" />}
                  {item.type === 'video' && <Play size={18} className="mr-2" />}
                  {item.type === 'document' && <File size={18} className="mr-2" />}
                  <span className="text-xs font-bold uppercase tracking-widest">{item.type}</span>
                </div>
                <h3 className="text-white font-bold text-lg">{item.title}</h3>
              </div>
              
              {/* Type Indicator Icon (Visible by default) */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-xl text-gray-900 shadow-sm group-hover:opacity-0 transition-opacity">
                {item.type === 'image' && <ImageIcon size={20} />}
                {item.type === 'video' && <Play size={20} />}
                {item.type === 'document' && <File size={20} />}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

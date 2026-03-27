import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const SiteFooter: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center items-center space-x-2 mb-6">
          <span className="text-2xl font-bold text-yellow-600">Global</span>
          <span className="text-2xl font-bold text-white ml-1">Talent UI</span>
        </div>
        <p className="text-sm">
          {t('footer.copyright')}
        </p>
        <div className="mt-8 flex justify-center space-x-6">
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
          <a href="#" className="hover:text-white transition-colors">Twitter</a>
          <a href="#" className="hover:text-white transition-colors">Facebook</a>
        </div>
      </div>
    </footer>
  );
};

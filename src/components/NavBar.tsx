import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const NavBar: React.FC = () => {
  const { lang, setLang, t } = useLanguage();
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.announcements'), path: '/announcements' },
    { name: t('nav.articles'), path: '/articles' },
    { name: t('nav.publications'), path: '/publications' },
    { name: t('nav.media'), path: '/media' },
    { name: t('nav.register'), path: '/register' },
  ];

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-yellow-600">Global</span>
              <span className="text-2xl font-bold text-gray-800 ml-1">Talent UI</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'text-yellow-600'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            <div className="flex items-center space-x-2 border-l pl-6 ml-6">
              <button
                onClick={() => setLang('id')}
                className={`text-xs font-bold px-2 py-1 rounded ${
                  lang === 'id' ? 'bg-yellow-600 text-white' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                ID
              </button>
              <button
                onClick={() => setLang('en')}
                className={`text-xs font-bold px-2 py-1 rounded ${
                  lang === 'en' ? 'bg-yellow-600 text-white' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                EN
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-gray-900"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md"
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex items-center space-x-4 px-3 py-2 border-t mt-2">
                <button
                  onClick={() => { setLang('id'); setIsOpen(false); }}
                  className={`text-sm font-bold ${lang === 'id' ? 'text-yellow-600' : 'text-gray-400'}`}
                >
                  Indonesia
                </button>
                <button
                  onClick={() => { setLang('en'); setIsOpen(false); }}
                  className={`text-sm font-bold ${lang === 'en' ? 'text-yellow-600' : 'text-gray-400'}`}
                >
                  English
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  X,
  Type,
  FileText,
  Save,
  Image as ImageIcon,
  User
} from 'lucide-react';
import { Article } from '../../types';
import { cn } from '../../lib/utils';

const initialArticles: Article[] = [
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
];

export const AdminArticles: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>(initialArticles);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    titleId: '',
    titleEn: '',
    excerptId: '',
    excerptEn: '',
    author: 'Super Admin',
    imageUrl: '',
    date: new Date().toISOString().split('T')[0],
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setArticles(prev => prev.map(art => art.id === editingId ? {
        ...art,
        title: { id: formData.titleId, en: formData.titleEn },
        excerpt: { id: formData.excerptId, en: formData.excerptEn },
        author: formData.author,
        imageUrl: formData.imageUrl,
        date: formData.date,
      } : art));
    } else {
      const newArt: Article = {
        id: Math.random().toString(36).substr(2, 9),
        title: { id: formData.titleId, en: formData.titleEn },
        excerpt: { id: formData.excerptId, en: formData.excerptEn },
        content: { id: '', en: '' },
        author: formData.author,
        imageUrl: formData.imageUrl || 'https://picsum.photos/seed/default/800/400',
        date: formData.date,
        createdAt: new Date().toISOString(),
      };
      setArticles(prev => [newArt, ...prev]);
    }
    closeModal();
  };

  const openModal = (art?: Article) => {
    if (art) {
      setEditingId(art.id);
      setFormData({
        titleId: art.title.id,
        titleEn: art.title.en,
        excerptId: art.excerpt.id,
        excerptEn: art.excerpt.en,
        author: art.author,
        imageUrl: art.imageUrl || '',
        date: art.date,
      });
    } else {
      setEditingId(null);
      setFormData({
        titleId: '',
        titleEn: '',
        excerptId: '',
        excerptEn: '',
        author: 'Super Admin',
        imageUrl: '',
        date: new Date().toISOString().split('T')[0],
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      setArticles(prev => prev.filter(art => art.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 outline-none transition-all"
          />
        </div>
        <button
          onClick={() => openModal()}
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-2xl font-bold flex items-center transition-all shadow-lg shadow-yellow-600/20"
        >
          <Plus size={20} className="mr-2" />
          Write New Article
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.filter(a => a.title.id.toLowerCase().includes(searchTerm.toLowerCase())).map((art) => (
          <motion.div
            key={art.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden group"
          >
            <div className="aspect-video relative overflow-hidden bg-gray-100">
              <img 
                src={art.imageUrl} 
                alt={art.title.id} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => openModal(art)}
                  className="p-2 bg-white/90 backdrop-blur-sm text-gray-700 hover:text-yellow-600 rounded-xl shadow-lg transition-all"
                >
                  <Edit2 size={16} />
                </button>
                <button 
                  onClick={() => handleDelete(art.id)}
                  className="p-2 bg-white/90 backdrop-blur-sm text-gray-700 hover:text-red-600 rounded-xl shadow-lg transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center text-xs font-bold text-yellow-600 uppercase tracking-widest mb-3">
                {art.date}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{art.title.id}</h3>
              <p className="text-sm text-gray-500 line-clamp-2 mb-4">{art.excerpt.id}</p>
              <div className="flex items-center text-xs text-gray-400">
                <User size={12} className="mr-1" />
                {art.author}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">
                  {editingId ? 'Edit Article' : 'Write New Article'}
                </h3>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center">
                      <Type size={16} className="mr-2 text-yellow-600" /> Title (ID)
                    </label>
                    <input
                      required
                      value={formData.titleId}
                      onChange={e => setFormData(prev => ({ ...prev, titleId: e.target.value }))}
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 outline-none transition-all"
                      placeholder="Judul Artikel"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center">
                      <Type size={16} className="mr-2 text-yellow-600" /> Title (EN)
                    </label>
                    <input
                      required
                      value={formData.titleEn}
                      onChange={e => setFormData(prev => ({ ...prev, titleEn: e.target.value }))}
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 outline-none transition-all"
                      placeholder="Article Title"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 flex items-center">
                    <FileText size={16} className="mr-2 text-yellow-600" /> Excerpt (ID)
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={formData.excerptId}
                    onChange={e => setFormData(prev => ({ ...prev, excerptId: e.target.value }))}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 outline-none transition-all resize-none"
                    placeholder="Ringkasan artikel..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 flex items-center">
                    <ImageIcon size={16} className="mr-2 text-yellow-600" /> Image URL
                  </label>
                  <input
                    value={formData.imageUrl}
                    onChange={e => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 outline-none transition-all"
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center">
                      Author
                    </label>
                    <input
                      required
                      value={formData.author}
                      onChange={e => setFormData(prev => ({ ...prev, author: e.target.value }))}
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center">
                      Date
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={e => setFormData(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="pt-6 flex gap-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-grow py-4 rounded-2xl font-bold text-gray-500 hover:bg-gray-100 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-grow py-4 bg-yellow-600 hover:bg-yellow-700 text-white rounded-2xl font-bold transition-all flex items-center justify-center"
                  >
                    <Save size={20} className="mr-2" />
                    {editingId ? 'Update Article' : 'Publish Article'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

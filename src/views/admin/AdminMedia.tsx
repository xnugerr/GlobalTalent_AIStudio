import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  X,
  Image as ImageIcon,
  Video,
  FileText,
  Save,
  Link as LinkIcon
} from 'lucide-react';
import { MediaItem } from '../../types';
import { cn } from '../../lib/utils';

const initialMedia: MediaItem[] = [
  {
    id: '1',
    title: { id: 'Global Talent UI Launch Event', en: 'Global Talent UI Launch Event' },
    type: 'image',
    url: 'https://picsum.photos/seed/launch/800/600',
    thumbnailUrl: 'https://picsum.photos/seed/launch/400/300',
    date: '2026-03-01',
  },
];

export const AdminMedia: React.FC = () => {
  const [media, setMedia] = useState<MediaItem[]>(initialMedia);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    titleId: '',
    titleEn: '',
    type: 'image' as MediaItem['type'],
    url: '',
    date: new Date().toISOString().split('T')[0],
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setMedia(prev => prev.map(m => m.id === editingId ? {
        ...m,
        title: { id: formData.titleId, en: formData.titleEn },
        type: formData.type,
        url: formData.url,
        date: formData.date,
      } : m));
    } else {
      const newMedia: MediaItem = {
        id: Math.random().toString(36).substr(2, 9),
        title: { id: formData.titleId, en: formData.titleEn },
        type: formData.type,
        url: formData.url,
        thumbnailUrl: formData.type === 'image' ? formData.url : undefined,
        date: formData.date,
      };
      setMedia(prev => [newMedia, ...prev]);
    }
    closeModal();
  };

  const openModal = (m?: MediaItem) => {
    if (m) {
      setEditingId(m.id);
      setFormData({
        titleId: m.title.id,
        titleEn: m.title.en,
        type: m.type,
        url: m.url,
        date: m.date,
      });
    } else {
      setEditingId(null);
      setFormData({
        titleId: '',
        titleEn: '',
        type: 'image',
        url: '',
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
    if (confirm('Are you sure you want to delete this media item?')) {
      setMedia(prev => prev.filter(m => m.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search media..."
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
          Upload Media
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {media.filter(m => m.title.id.toLowerCase().includes(searchTerm.toLowerCase())).map((m) => (
          <motion.div
            key={m.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden group relative"
          >
            <div className="aspect-square relative overflow-hidden bg-gray-100">
              {m.type === 'image' ? (
                <img 
                  src={m.url} 
                  alt={m.title.id} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  {m.type === 'video' ? <Video size={48} /> : <FileText size={48} />}
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                <button 
                  onClick={() => openModal(m)}
                  className="p-3 bg-white text-gray-700 hover:text-yellow-600 rounded-2xl shadow-xl transition-all"
                >
                  <Edit2 size={20} />
                </button>
                <button 
                  onClick={() => handleDelete(m.id)}
                  className="p-3 bg-white text-gray-700 hover:text-red-600 rounded-2xl shadow-xl transition-all"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center text-[10px] font-bold text-yellow-600 uppercase tracking-widest mb-1">
                {m.type}
              </div>
              <h3 className="text-sm font-bold text-gray-900 truncate">{m.title.id}</h3>
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
              className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">
                  {editingId ? 'Edit Media' : 'Upload New Media'}
                </h3>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Title (ID)</label>
                    <input
                      required
                      value={formData.titleId}
                      onChange={e => setFormData(prev => ({ ...prev, titleId: e.target.value }))}
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">Title (EN)</label>
                    <input
                      required
                      value={formData.titleEn}
                      onChange={e => setFormData(prev => ({ ...prev, titleEn: e.target.value }))}
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Media Type</label>
                  <div className="flex gap-4">
                    {['image', 'video', 'document'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, type: type as MediaItem['type'] }))}
                        className={cn(
                          "flex-grow py-3 rounded-2xl text-sm font-bold capitalize transition-all border",
                          formData.type === type 
                            ? "bg-yellow-600 text-white border-yellow-600 shadow-md" 
                            : "bg-white text-gray-500 border-gray-200 hover:bg-gray-50"
                        )}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 flex items-center">
                    <LinkIcon size={16} className="mr-2 text-yellow-600" /> Media URL
                  </label>
                  <input
                    required
                    value={formData.url}
                    onChange={e => setFormData(prev => ({ ...prev, url: e.target.value }))}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 outline-none transition-all"
                    placeholder="https://..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Date</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={e => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 outline-none transition-all"
                  />
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
                    {editingId ? 'Update Media' : 'Upload Media'}
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

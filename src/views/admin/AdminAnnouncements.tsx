import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  ExternalLink, 
  X,
  Calendar,
  Type,
  FileText,
  Save
} from 'lucide-react';
import { Announcement, Language } from '../../types';
import { cn } from '../../lib/utils';

const initialAnnouncements: Announcement[] = [
  {
    id: '1',
    title: { id: 'Pembukaan Pendaftaran Program Global Talent UI 2026', en: 'Opening of Global Talent UI Program Registration 2026' },
    content: { id: 'Kami mengundang seluruh dosen dan peneliti untuk mendaftarkan diri...', en: 'We invite all lecturers and researchers to register...' },
    date: '2026-03-20',
    category: 'academic',
    pdfUrl: '#',
    createdAt: '2026-03-20T10:00:00Z',
  },
];

export const AdminAnnouncements: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    titleId: '',
    titleEn: '',
    contentId: '',
    contentEn: '',
    category: 'general' as Announcement['category'],
    date: new Date().toISOString().split('T')[0],
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setAnnouncements(prev => prev.map(ann => ann.id === editingId ? {
        ...ann,
        title: { id: formData.titleId, en: formData.titleEn },
        content: { id: formData.contentId, en: formData.contentEn },
        category: formData.category,
        date: formData.date,
      } : ann));
    } else {
      const newAnn: Announcement = {
        id: Math.random().toString(36).substr(2, 9),
        title: { id: formData.titleId, en: formData.titleEn },
        content: { id: formData.contentId, en: formData.contentEn },
        category: formData.category,
        date: formData.date,
        createdAt: new Date().toISOString(),
      };
      setAnnouncements(prev => [newAnn, ...prev]);
    }
    closeModal();
  };

  const openModal = (ann?: Announcement) => {
    if (ann) {
      setEditingId(ann.id);
      setFormData({
        titleId: ann.title.id,
        titleEn: ann.title.en,
        contentId: ann.content.id,
        contentEn: ann.content.en,
        category: ann.category,
        date: ann.date,
      });
    } else {
      setEditingId(null);
      setFormData({
        titleId: '',
        titleEn: '',
        contentId: '',
        contentEn: '',
        category: 'general',
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
    if (confirm('Are you sure you want to delete this announcement?')) {
      setAnnouncements(prev => prev.filter(ann => ann.id !== id));
    }
  };

  const filteredAnnouncements = announcements.filter(ann => 
    ann.title.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ann.title.en.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search announcements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all"
          />
        </div>
        <button
          onClick={() => openModal()}
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-2xl font-bold flex items-center transition-all shadow-lg shadow-yellow-600/20"
        >
          <Plus size={20} className="mr-2" />
          Publish New
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Announcement</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredAnnouncements.map((ann) => (
              <tr key={ann.id} className="hover:bg-gray-50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="font-bold text-gray-900 mb-1">{ann.title.id}</div>
                  <div className="text-xs text-gray-500 truncate max-w-xs italic">{ann.title.en}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider",
                    ann.category === 'academic' ? "bg-blue-50 text-blue-700" :
                    ann.category === 'event' ? "bg-purple-50 text-purple-700" :
                    "bg-gray-100 text-gray-700"
                  )}>
                    {ann.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                  {ann.date}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => openModal(ann)}
                      className="p-2 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-xl transition-all"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(ann.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredAnnouncements.length === 0 && (
          <div className="py-20 text-center text-gray-500 font-medium">
            No announcements found.
          </div>
        )}
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
              className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">
                  {editingId ? 'Edit Announcement' : 'Publish New Announcement'}
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
                      placeholder="Judul Pengumuman"
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
                      placeholder="Announcement Title"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 flex items-center">
                    <FileText size={16} className="mr-2 text-yellow-600" /> Content (ID)
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.contentId}
                    onChange={e => setFormData(prev => ({ ...prev, contentId: e.target.value }))}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 outline-none transition-all resize-none"
                    placeholder="Isi pengumuman..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 flex items-center">
                    <FileText size={16} className="mr-2 text-yellow-600" /> Content (EN)
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.contentEn}
                    onChange={e => setFormData(prev => ({ ...prev, contentEn: e.target.value }))}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 outline-none transition-all resize-none"
                    placeholder="Announcement content..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center">
                      <Calendar size={16} className="mr-2 text-yellow-600" /> Date
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={e => setFormData(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 flex items-center">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={e => setFormData(prev => ({ ...prev, category: e.target.value as any }))}
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 outline-none transition-all bg-white"
                    >
                      <option value="general">General</option>
                      <option value="academic">Academic</option>
                      <option value="event">Event</option>
                    </select>
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
                    {editingId ? 'Update Announcement' : 'Publish Now'}
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

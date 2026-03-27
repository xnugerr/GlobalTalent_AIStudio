import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  X,
  BookOpen,
  User,
  Globe,
  Save,
  ExternalLink
} from 'lucide-react';
import { Publication } from '../../types';
import { cn } from '../../lib/utils';

const initialPublications: Publication[] = [
  {
    id: '1',
    title: { id: 'Inovasi Teknologi untuk Keberlanjutan', en: 'Technological Innovation for Sustainability' },
    authors: 'Dr. John Doe, et al.',
    journal: 'International Journal of Science',
    year: '2026',
    doi: '10.1234/ijs.2026.001',
    url: 'https://doi.org/10.1234/ijs.2026.001',
  },
];

export const AdminPublications: React.FC = () => {
  const [publications, setPublications] = useState<Publication[]>(initialPublications);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    titleId: '',
    titleEn: '',
    authors: '',
    journal: '',
    year: new Date().getFullYear().toString(),
    doi: '',
    url: '',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setPublications(prev => prev.map(pub => pub.id === editingId ? {
        ...pub,
        title: { id: formData.titleId, en: formData.titleEn },
        authors: formData.authors,
        journal: formData.journal,
        year: formData.year,
        doi: formData.doi,
        url: formData.url,
      } : pub));
    } else {
      const newPub: Publication = {
        id: Math.random().toString(36).substr(2, 9),
        title: { id: formData.titleId, en: formData.titleEn },
        authors: formData.authors,
        journal: formData.journal,
        year: formData.year,
        doi: formData.doi,
        url: formData.url,
      };
      setPublications(prev => [newPub, ...prev]);
    }
    closeModal();
  };

  const openModal = (pub?: Publication) => {
    if (pub) {
      setEditingId(pub.id);
      setFormData({
        titleId: pub.title.id,
        titleEn: pub.title.en,
        authors: pub.authors,
        journal: pub.journal,
        year: pub.year,
        doi: pub.doi || '',
        url: pub.url || '',
      });
    } else {
      setEditingId(null);
      setFormData({
        titleId: '',
        titleEn: '',
        authors: '',
        journal: '',
        year: new Date().getFullYear().toString(),
        doi: '',
        url: '',
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this publication?')) {
      setPublications(prev => prev.filter(pub => pub.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search publications..."
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
          Add Publication
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Publication Details</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Authors</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Journal/Year</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {publications.filter(p => p.title.id.toLowerCase().includes(searchTerm.toLowerCase())).map((pub) => (
                <tr key={pub.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-gray-900 mb-1">{pub.title.id}</div>
                    <div className="text-xs text-gray-500 font-mono">{pub.doi || 'No DOI'}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">{pub.authors}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 font-medium">{pub.journal}</div>
                    <div className="text-xs text-gray-500">{pub.year}</div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        onClick={() => openModal(pub)}
                        className="p-2 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-xl transition-all"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(pub.id)}
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
        </div>
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
                  {editingId ? 'Edit Publication' : 'Add New Publication'}
                </h3>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                <div className="space-y-4">
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
                    <label className="text-sm font-bold text-gray-700">Authors</label>
                    <input
                      required
                      value={formData.authors}
                      onChange={e => setFormData(prev => ({ ...prev, authors: e.target.value }))}
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 outline-none transition-all"
                      placeholder="e.g. Dr. John Doe, Prof. Jane Smith"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Journal</label>
                      <input
                        required
                        value={formData.journal}
                        onChange={e => setFormData(prev => ({ ...prev, journal: e.target.value }))}
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">Year</label>
                      <input
                        required
                        value={formData.year}
                        onChange={e => setFormData(prev => ({ ...prev, year: e.target.value }))}
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">DOI</label>
                      <input
                        value={formData.doi}
                        onChange={e => setFormData(prev => ({ ...prev, doi: e.target.value }))}
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 outline-none transition-all"
                        placeholder="10.xxxx/xxxx"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700">URL</label>
                      <input
                        value={formData.url}
                        onChange={e => setFormData(prev => ({ ...prev, url: e.target.value }))}
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 outline-none transition-all"
                        placeholder="https://..."
                      />
                    </div>
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
                    {editingId ? 'Update Publication' : 'Add Publication'}
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

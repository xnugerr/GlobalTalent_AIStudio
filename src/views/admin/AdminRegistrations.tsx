import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock,
  Filter,
  User,
  Mail,
  Phone,
  Calendar,
  Download,
  X
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface Registration {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  program: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
  documents: { name: string; url: string }[];
}

const initialRegistrations: Registration[] = [
  {
    id: 'REG-001',
    fullName: 'Budi Santoso',
    email: 'budi.s@example.com',
    phone: '08123456789',
    program: 'Global Talent Exchange',
    status: 'pending',
    date: '2026-03-20',
    documents: [
      { name: 'CV.pdf', url: '#' },
      { name: 'Passport.pdf', url: '#' },
    ]
  },
  {
    id: 'REG-002',
    fullName: 'Siti Aminah',
    email: 'siti.a@example.com',
    phone: '08987654321',
    program: 'Research Fellowship',
    status: 'approved',
    date: '2026-03-18',
    documents: [
      { name: 'Proposal.pdf', url: '#' },
      { name: 'Academic_Transcript.pdf', url: '#' },
    ]
  }
];

export const AdminRegistrations: React.FC = () => {
  const [registrations, setRegistrations] = useState<Registration[]>(initialRegistrations);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedReg, setSelectedReg] = useState<Registration | null>(null);

  const handleStatusChange = (id: string, newStatus: 'approved' | 'rejected') => {
    setRegistrations(prev => prev.map(reg => reg.id === id ? { ...reg, status: newStatus } : reg));
    if (selectedReg?.id === id) {
      setSelectedReg(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const filtered = registrations.filter(reg => {
    const matchesSearch = reg.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         reg.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || reg.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search registrations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 outline-none transition-all"
          />
        </div>
        <div className="flex items-center space-x-2 bg-white p-1 rounded-2xl border border-gray-200">
          {['all', 'pending', 'approved', 'rejected'].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-bold capitalize transition-all",
                filterStatus === s 
                  ? "bg-yellow-600 text-white shadow-md" 
                  : "text-gray-500 hover:bg-gray-50"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Applicant</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Program</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((reg) => (
                <tr key={reg.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold mr-3">
                        {reg.fullName.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900">{reg.fullName}</div>
                        <div className="text-xs text-gray-500">{reg.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{reg.program}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{reg.date}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold capitalize",
                      reg.status === 'approved' ? "bg-green-100 text-green-700" :
                      reg.status === 'rejected' ? "bg-red-100 text-red-700" :
                      "bg-yellow-100 text-yellow-700"
                    )}>
                      {reg.status === 'approved' && <CheckCircle size={12} className="mr-1" />}
                      {reg.status === 'rejected' && <XCircle size={12} className="mr-1" />}
                      {reg.status === 'pending' && <Clock size={12} className="mr-1" />}
                      {reg.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedReg(reg)}
                      className="p-2 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-xl transition-all"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedReg && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedReg(null)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Registration Details</h3>
                  <p className="text-sm text-gray-500">ID: {selectedReg.id}</p>
                </div>
                <button onClick={() => setSelectedReg(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Personal Info</h4>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm">
                        <User size={16} className="mr-3 text-yellow-600" />
                        <span className="font-medium text-gray-900">{selectedReg.fullName}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Mail size={16} className="mr-3 text-yellow-600" />
                        <span className="text-gray-600">{selectedReg.email}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone size={16} className="mr-3 text-yellow-600" />
                        <span className="text-gray-600">{selectedReg.phone}</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Application Info</h4>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm">
                        <Filter size={16} className="mr-3 text-yellow-600" />
                        <span className="font-medium text-gray-900">{selectedReg.program}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Calendar size={16} className="mr-3 text-yellow-600" />
                        <span className="text-gray-600">Applied on {selectedReg.date}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Documents</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedReg.documents.map((doc, idx) => (
                      <a
                        key={idx}
                        href={doc.url}
                        className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 hover:border-yellow-200 hover:bg-yellow-50 transition-all group"
                      >
                        <span className="text-sm font-medium text-gray-700">{doc.name}</span>
                        <Download size={16} className="text-gray-400 group-hover:text-yellow-600" />
                      </a>
                    ))}
                  </div>
                </div>

                <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => handleStatusChange(selectedReg.id, 'approved')}
                    disabled={selectedReg.status === 'approved'}
                    className={cn(
                      "flex-grow py-4 rounded-2xl font-bold flex items-center justify-center transition-all",
                      selectedReg.status === 'approved' 
                        ? "bg-green-50 text-green-700 cursor-not-allowed" 
                        : "bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/20"
                    )}
                  >
                    <CheckCircle size={20} className="mr-2" />
                    Approve Registration
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedReg.id, 'rejected')}
                    disabled={selectedReg.status === 'rejected'}
                    className={cn(
                      "flex-grow py-4 rounded-2xl font-bold flex items-center justify-center transition-all",
                      selectedReg.status === 'rejected' 
                        ? "bg-red-50 text-red-700 cursor-not-allowed" 
                        : "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/20"
                    )}
                  >
                    <XCircle size={20} className="mr-2" />
                    Reject Registration
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

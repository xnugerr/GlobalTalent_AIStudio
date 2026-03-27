import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'motion/react';
import { User, Mail, Building, GraduationCap, Upload, CheckCircle } from 'lucide-react';

export const RegisterView: React.FC = () => {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-white px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 text-green-600 rounded-full mb-8">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Pendaftaran Berhasil!</h2>
          <p className="text-gray-600 mb-10 leading-relaxed">
            Terima kasih telah mendaftar. Tim kami akan meninjau berkas Anda dan memberikan informasi lebih lanjut melalui email.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-4 rounded-full font-bold transition-all"
          >
            Kembali ke Beranda
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100"
        >
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{t('nav.register')}</h1>
            <p className="text-gray-600">Lengkapi formulir di bawah ini untuk mendaftar ke Program Global Talent UI.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 flex items-center">
                  <User size={16} className="mr-2 text-yellow-600" /> Nama Lengkap
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 flex items-center">
                  <Mail size={16} className="mr-2 text-yellow-600" /> Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 flex items-center">
                  <Building size={16} className="mr-2 text-yellow-600" /> Institusi / Fakultas
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all"
                  placeholder="Fakultas Teknik UI"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 flex items-center">
                  <GraduationCap size={16} className="mr-2 text-yellow-600" /> Program
                </label>
                <select className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-all appearance-none bg-white">
                  <option>Research Grant</option>
                  <option>Publication Support</option>
                  <option>Visiting Professor</option>
                  <option>Student Exchange</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 flex items-center">
                <Upload size={16} className="mr-2 text-yellow-600" /> Unggah Berkas (PDF)
              </label>
              <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-yellow-500 transition-colors cursor-pointer group">
                <Upload className="mx-auto text-gray-400 group-hover:text-yellow-600 mb-4 transition-colors" size={32} />
                <p className="text-sm text-gray-500 font-medium">Klik atau seret berkas ke sini</p>
                <p className="text-xs text-gray-400 mt-2">Maksimal 5MB</p>
                <input type="file" className="hidden" accept=".pdf" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-4 rounded-2xl font-bold text-lg transition-all shadow-lg shadow-yellow-600/20"
            >
              Kirim Pendaftaran
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

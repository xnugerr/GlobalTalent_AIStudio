import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { 
  Users, 
  Bell, 
  FileText, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Settings
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const stats = [
    { name: 'Total Pendaftar', value: '524', change: '+12%', icon: Users, trend: 'up' },
    { name: 'Pengumuman Aktif', value: '18', change: '+2', icon: Bell, trend: 'up' },
    { name: 'Artikel Terbit', value: '45', change: '+5%', icon: FileText, trend: 'up' },
    { name: 'Pengunjung Web', value: '2.4k', change: '-3%', icon: TrendingUp, trend: 'down' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-50 rounded-2xl">
                <stat.icon className="text-yellow-600 h-6 w-6" />
              </div>
              <div className={cn(
                "flex items-center text-xs font-bold px-2 py-1 rounded-full",
                stat.trend === 'up' ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
              )}>
                {stat.trend === 'up' ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
                {stat.change}
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm font-medium text-gray-500">{stat.name}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Registrations */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Pendaftaran Terbaru</h3>
            <button className="text-sm font-bold text-yellow-600 hover:text-yellow-700">Lihat Semua</button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center p-4 hover:bg-gray-50 rounded-2xl transition-colors border border-transparent hover:border-gray-100">
                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-bold mr-4">
                  {String.fromCharCode(64 + i)}
                </div>
                <div className="flex-grow">
                  <div className="text-sm font-bold text-gray-900">Pendaftar #{i}</div>
                  <div className="text-xs text-gray-500">Fakultas Teknik • 2 jam yang lalu</div>
                </div>
                <div className="text-xs font-bold px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full">
                  Pending
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Aksi Cepat</h3>
          <div className="grid grid-cols-2 gap-4">
            <QuickAction icon={Bell} label="Buat Pengumuman" color="bg-blue-50 text-blue-600" />
            <QuickAction icon={FileText} label="Tulis Artikel" color="bg-purple-50 text-purple-600" />
            <QuickAction icon={Users} label="Kelola User" color="bg-orange-50 text-orange-600" />
            <QuickAction icon={Settings} label="Pengaturan" color="bg-gray-50 text-gray-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

const QuickAction: React.FC<{ icon: any; label: string; color: string }> = ({ icon: Icon, label, color }) => (
  <button className={cn("p-6 rounded-2xl flex flex-col items-center justify-center text-center transition-all hover:scale-105", color)}>
    <Icon className="mb-3 h-6 w-6" />
    <span className="text-sm font-bold">{label}</span>
  </button>
);

import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Bell, 
  FileText, 
  BookOpen, 
  Image, 
  Users, 
  Settings, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import { cn } from '../../lib/utils';

export const AdminShell: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Announcements', path: '/admin/announcements', icon: Bell },
    { name: 'Articles', path: '/admin/articles', icon: FileText },
    { name: 'Publications', path: '/admin/publications', icon: BookOpen },
    { name: 'Media', path: '/admin/media', icon: Image },
    { name: 'Registrations', path: '/admin/registrations', icon: Users },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-yellow-600">Global</span>
            <span className="text-xl font-bold text-gray-800 ml-1">Talent UI</span>
          </Link>
        </div>
        
        <nav className="flex-grow p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all group",
                location.pathname === item.path
                  ? "bg-yellow-50 text-yellow-700"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon className={cn(
                "mr-3 h-5 w-5",
                location.pathname === item.path ? "text-yellow-600" : "text-gray-400 group-hover:text-gray-600"
              )} />
              {item.name}
              {location.pathname === item.path && (
                <ChevronRight className="ml-auto h-4 w-4" />
              )}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={() => navigate('/')}
            className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-all"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto">
        <header className="bg-white border-b border-gray-200 h-16 flex items-center px-8 justify-between sticky top-0 z-10">
          <h2 className="text-lg font-bold text-gray-900">
            {menuItems.find(m => m.path === location.pathname)?.name || 'Admin Panel'}
          </h2>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm font-bold text-gray-900">Super Admin</div>
              <div className="text-xs text-gray-500">admin@ui.ac.id</div>
            </div>
            <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-700 font-bold">
              SA
            </div>
          </div>
        </header>
        
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
